// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser : true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');
    const db = client.db('TodoApp');

    // findOneAndDelete
    db.collection('Todos').findOneAndUpdate({
        _id : new ObjectID('5b37fceff7272d3951f4d42d')
    }, {
        $set: {
            completed: true,
            addThis: 'trest'
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //client.close();
});