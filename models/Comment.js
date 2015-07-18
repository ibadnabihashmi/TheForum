var mongoose = require('mongoose');
var User = require('../models/User');

var commentSchema = new mongoose.Schema({
    text: {
        type: String
    },
    date : {
        type : Date
    },
    questionId:{
        type: mongoose.Schema.Types.ObjectId
    },
    byUser :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('Comment',commentSchema);