const router = require('express').Router();
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const axios = require('axios');

var {mongoose} = require('./../db/mongoose');
var {Game} = require('./../models/game');

router.post('/', (req, res) => {
   axios.get('http://steamspy.com/api.php?request=top100in2weeks')
       .then((response) => {
           if(response.statusText === 'OK') {
               return response.data;
           } else {
               res.status(404).send({status: 0, error: "Error retrieving games."});
           }
       })
       .then((games) => {
           Object.keys(games).forEach((key) => {
               let game = games[key];
               let newGame = new Game({
                   appId: game.appid,
                   name: game.name,
                   developer: game.developer,
                   publisher: game.publisher,
                   scoreRank: game.score_rank,
                   positive: game.positive,
                   negative: game.negative,
                   userScore: game.userscore,
                   averageForever: game.average_forever,
                   averageBiweekly: game.average_2weeks,
                   medianForever: game.median_forever,
                   medianBiweekly: game.median_2weeks,
                   price: game.price,
                   discount: game.discount,
                   img: "https://steamcdn-a.akamaihd.net/steam/apps/" + game.appid + "/header.jpg"
               });

               newGame.save();
           });

           res.status(201).send({status: 1});
       })
       .catch(e => {
           res.status(404).send({status: 0, error: "Error getting or saving games " + e});
       });
});

router.get('/steam', (req, res) => {
    Game.find({})
        .then((games) => {
            if(games){
                res.status(200).send({
                    status: 1,
                    games
                });
            } else {
                res.status(404).send({status: 1, games: null});
            }
        })
        .catch(e => res.status(404).send({status: 0, error: e}));
});

module.exports = router;