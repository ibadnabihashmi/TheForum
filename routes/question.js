var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
var Comment = require('../models/Comment');
var Tag = require('../models/Tag');
var Cat = require('../models/Category');
var express = require('express');
var router = express.Router();

router.post('/thumbsUp',function(req,res){
    Comment
        .findById(req.body.comment._id)
        .exec(function(err,comment){
            if(!err){
                if(comment.dislikes.indexOf(req.user.id) != -1){
                    comment.dislikes.splice(comment.dislikes.indexOf(req.user.id),comment.dislikes.indexOf(req.user.id)+1);
                }
                comment.likes.push(req.user.id);
                comment.save(function(err){
                    if(!err){
                        res.send(200);
                    }
                });
            }
        });
});
router.post('/thumbsDown',function(req,res){
    Comment
        .findById(req.body.comment._id)
        .exec(function(err,comment){
            if(!err){
                if(comment.likes.indexOf(req.user.id) != -1){
                    comment.likes.splice(comment.likes.indexOf(req.user.id),comment.likes.indexOf(req.user.id)+1);
                }
                comment.dislikes.push(req.user.id);
                comment.save(function(err){
                    if(!err){
                        res.send(200);
                    }
                });
            }
        });
});
router.post('/rate',function(req,res){
    Question
        .findById(req.body.qid)
        .populate('userID username email profile to')
        .exec(function(err,question){
            if(question){
                question.rating.average = (question.rating.ratedBy.length == 0) ? req.body.rating : Math.floor((req.body.rating + question.rating.average)/2);
                question.rating.ratedBy.push(req.user.id);
                question.save(function(err){
                    if(!err){
                        res.send(200,{
                            question:question
                        });
                    }else{
                        res.send(500,{
                            err:err
                        });
                    }
                });

            }else{
                res.send(404);
            }
        });
});
router.get('/deleteQuestion',function(req, res){
    Question.find({_id: req.query.qid, userID: req.user.id}).remove().exec(function(error, res){
        if(!error) {
            if(res.result.n>0){
                Comment.find({questionId: req.query.qid}).remove().exec(function(error, res){});
            }
        }
    });
    Tag.update({questionsTagged: req.query.qid}, {$pull: {questionsTagged: req.query.qid}}, {multi: true}).exec(function(error, res){
        Tag.update({questionsTagged: {$size: 0 }}).remove().exec(function(error, res){});
    });

});
router.get('/deleteComment',function(req, res){
    Comment.find({_id: req.query.cid, byUser: req.user.id}).remove().exec(function(error, res){
        if(!error) {}
        else console.log(error);
    });
//    User.findOneAndUpdate({notifications: notifactionsID})
});

module.exports = router;