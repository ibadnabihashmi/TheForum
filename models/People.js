var mongoose = require('mongoose');

var peopleSchema = new mongoose.Schema({
    title : {
        type : String
    },
    urlTitle : {
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
    text : {
        type : String
    },
    imglink : {
        type : String
    },
    vidLink : {
        type : String
    },
    imgpath : {
        type : String
    },
    options : [
        {
            text: {type:String},
            votes: [mongoose.Schema.Types.ObjectId],
            comments: [mongoose.Schema.Types.ObjectId]
        }
    ],
    ipPool:[String],
    counter:{type:Number,default:0},
    counterText:{type:String},
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('People',peopleSchema);