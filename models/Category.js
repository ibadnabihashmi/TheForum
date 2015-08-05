
var mongoose = require('mongoose');
var Question = require('../models/Question');
var catSchema = new mongoose.Schema({
    name : {
        type : String
    },
    questions : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Question'
    }
});

module.exports = mongoose.model('Category',catSchema);