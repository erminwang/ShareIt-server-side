var env = process.env.NODE_ENV || 'development';   // process.env.NODE_ENV = 'production' when pushing to heroku

if(env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]      //process.env.PORT = 8000; && process.env.MONGODB_URI = <the correct mongodb url>
    });
}

// if(env === 'development') {
//     process.env.PORT = 8000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//     process.env.PORT = 8000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }