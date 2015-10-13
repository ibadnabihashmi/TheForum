var mongoose = require('mongoose');
var User = require('../models/User');
var Question = require('../models/Question');
var secondaryUserSchema = new mongoose.Schema({
    primaryUsers:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            seen : {type:Boolean,default:false},
            read : {type:Boolean,default:false}
        }
    ],
    secondaryUsers:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    assocPost:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Question'
    }
});

module.exports = mongoose.model('SecondaryUser',secondaryUserSchema);