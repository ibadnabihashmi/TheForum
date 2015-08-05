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
    Question
        .findById(req.body.question._id)
        .exec(function(err,question){
            if(!err){
                if(question.dislikes.indexOf(req.user.id) != -1){
                    console.log("present " + question.dislikes.indexOf(req.user.id));
                    question.dislikes.splice(question.dislikes.indexOf(req.user.id),question.dislikes.indexOf(req.user.id)+1);
                }
                question.likes.push(req.user.id);
                question.save(function(err){
                    if(!err){
                        res.send(200);
                    }
                });
            }
        });
});
router.post('/thumbsDown',function(req,res){
    Question
        .findById(req.body.question._id)
        .exec(function(err,question){
            if(!err){
                if(question.likes.indexOf(req.user.id) != -1){
                    console.log("present " + question.likes.indexOf(req.user.id));
                    question.likes.splice(question.likes.indexOf(req.user.id),question.likes.indexOf(req.user.id)+1);
                }
                question.dislikes.push(req.user.id);
                question.save(function(err){
                    if(!err){
                        res.send(200);
                    }
                });
            }
        });
});
module.exports = router;