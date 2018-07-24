require('./config/config');

const path = require('path');
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../views');
const cookieParser = require('cookie-parser');

// const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
// const {ObjectID} = require('mongodb');

// var {mongoose} = require('./db/mongoose');
// var {Todo} = require('./models/todo');
// var {User} = require('./models/user');
// var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.set('views', viewPath);
app.set('view engine', 'ejs');

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('./controllers'));

app.listen(port, () => {
    console.log('Started at port ' + port);
});

module.exports = {app};