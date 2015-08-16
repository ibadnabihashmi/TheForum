var mongoose = require('mongoose');
var User = require('../models/User');
var pollSchema = new mongoose.Schema({
    text : {
        type : String
    },
    options : [
        {
            text: {type:String},
            votes: [mongoose.Schema.Types.ObjectId],
            comments: [mongoose.Schema.Types.ObjectId]
        }
    ],
    category : {type : String},
    tags : [String],
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('Poll',pollSchema);