var mongoose = require('mongoose');
var Question = require('../models/Question');
var tagSchema = new mongoose.Schema({
    name : {
        type : String
    },
    questionsTagged : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Question'
        }
    ]
});

module.exports = mongoose.model('Tag',tagSchema);