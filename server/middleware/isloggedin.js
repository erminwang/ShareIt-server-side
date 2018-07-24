const {User} = require('./../models/user');


// simply check if the user is logged in
var isloggedin = (req, res, next) => {
    var token = req.header('x-auth');
    req.isloggedin = false;

    if(token) {
        User.findByToken(token).then((user) => {
            if(!user) {
                return next();
            }

            req.isloggedin = true;
            req.user = user;
            req.token = token;
            return next();
        }).catch((e) => {
            console.log("An error occurs while verifying login status");
            next();
        });
     } else {
        return next();
    }



};

module.exports = {isloggedin};