var mongoose = require('mongoose');
var User = require('../models/User');

var questionSchema = new mongoose.Schema({
    question : {
        type : String
    },
    category : {
        type : String
    },
    likes : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User'
    },
    dislikes : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User'
    },
    type : {
        type : String
    },
    options : [
        {
            text: {type:String},
            votes: [mongoose.Schema.Types.ObjectId],
            comments: [mongoose.Schema.Types.ObjectId]
        }
    ],
    date : {
        type : Date
    },
    tags : [String],
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('Question',questionSchema);