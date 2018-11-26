//We define the Schema

var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
    hour: {type: String, required: true},
    dateOfCreation: {type: String, required: true},
    content: {type: Object, required: true}
}, {collection: 'Events'});

//We export the model
var events = module.exports = mongoose.model('events', Schema);