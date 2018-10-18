const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var singleGameSchema = new Schema({
//    appId: String,
//    name: String,
//    developer: String,
//    publisher: String,
//    scoreRank: Number,
//    positive: Number,
//    negative: Number,
//    userScore: Number,
//    averageForever: Number,
//    averageBiweekly: Number,
//    price: String,
//    discount: String
// });

var Game = mongoose.model('Game', {
    appId: String,
    name: String,
    developer: String,
    publisher: String,
    scoreRank: Number,
    positive: Number,
    negative: Number,
    userScore: Number,
    averageForever: Number,
    averageBiweekly: Number,
    medianForever: Number,
    medianBiweekly: Number,
    price: String,
    discount: String,
    img: String
});

module.exports = {Game};
