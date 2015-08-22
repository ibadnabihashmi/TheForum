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
module.exports = router;