var mongoose = require('mongoose');


var questionSchema = new mongoose.Schema({
    question : {
        type : String
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