const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}) can remove everything

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove

Todo.findOneAndRemove({_id: '5b416d9b4252e7f26ac808ba'}).then((todo) => {

});

// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5b416d9b4252e7f26ac808ba').then((todo) => {
    console.log(todo);
})