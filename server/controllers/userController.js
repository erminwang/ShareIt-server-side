const router = require('express').Router();
const _ = require('lodash');

var {mongoose} = require('./../db/mongoose');
var {User} = require('./../models/user');
var {authenticate} = require('./../middleware/authenticate');

// USER_OPERATIONS
router.post('/signup', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })

});

router.get('/me', authenticate, (req, res) => {
    console.log("getting user");
    res.send(req.user);
});

router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send({
            "ok": -1,
            "errorMsg": "Invalid email and password combination"
        });
    });
});

router.delete('/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();          // if there is an error, the second callback will fire
    });
});

module.exports = router;