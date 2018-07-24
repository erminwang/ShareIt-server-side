const {User} = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.cookies.token;

    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();   // if this code executes, the catch block will directly catch the error
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send({
            "errorMsg": "Unauthorized action"
        });
    });
};

module.exports = {authenticate};