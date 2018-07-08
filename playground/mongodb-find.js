// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser : true }, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //    console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().toArray((err, docs) => {
    //     if(err) {
    //        return console.log('Unable to fetch todos', err);
    //     }
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // });

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b37fceff7272d3951f4d42d')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });



    //client.close();
});