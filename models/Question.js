var mongoose = require('mongoose');
var User = require('../models/User');

var questionSchema = new mongoose.Schema({
    question : {
        type : String
    },
    code : {
        type : String
    },
    rating : {
        average : {
            type : Number,
            default:1
        },
        ratedBy : {
            type:[mongoose.Schema.Types.ObjectId],
            default:[]
        }
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
    },
    to: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
});

module.exports = mongoose.model('Question',questionSchema);