var mongoose = require('mongoose');
var User = require('../models/User');

var commentSchema = new mongoose.Schema({
    text: {
        type: String
    },
    code : {
        type : String
    },
    date : {
        type : Date
    },
    for : {
        type: String
    },
    side : {
        type: Number
    },
    questionId:{
        type: mongoose.Schema.Types.ObjectId
    },
    byUser :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    likes : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User'
    },
    dislikes : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User'
    }
});

module.exports = mongoose.model('Comment',commentSchema);