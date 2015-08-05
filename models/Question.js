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
    date : {
        type : Date
    },
    tags : [String],
    userID : {
        type : mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Question',questionSchema);