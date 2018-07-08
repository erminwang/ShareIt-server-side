const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

// the following is the same as "module.exports = {mongoose : mongoose};"
module.exports = {mongoose};
