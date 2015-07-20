var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
var Comment = require('../models/Comment');
var Tag = require('../models/Tag');
var express = require('express');
var router = express.Router();


function render(req,res){
    console.log('hahahaha');
    res.render('Forum', {
        title: 'Account Management',
        user: req.user
    });
}

router.get('/',render);
router.get('/ask',render);
router.get('/myquestion',render);

router.post('/ask',function(req,res,next){
    var question = new Question({
        question : req.body.text,
        tags : req.body.tags.split(','),
        date : Date.now(),
        userID : req.user.id
    });
    question.save(function(err){
        if(!err){
            async.each(req.body.tags.split(','),function(tag,callback){
                Tag.find({name:tag})
                    .exec(function(err,tags){
                        if(tags.length > 0){
                            tags[0].questionsTagged.push(question._id);
                            tags[0].save(function(err){
                                if(!err){
                                    callback();
                                }
                            });
                        }else{
                            var _tag = new Tag({
                                name:tag
                            });
                            _tag.questionsTagged.push(question._id);
                            _tag.save(function(err){
                                if(!err){
                                    callback();
                                }
                            });
                        }
                    });
            },function(err){
                if(err){
                    res.send(500)
                }else{
                    res.send(200);
                }
            });
        }
    });
});
router.get('/question',function(req,res,next){
    Question.
        findById(req.query.qid)
        .exec(function(err,question){
            res.send(200,{
                question:question
            });
        });
});
router.get('/getComments',function(req,res){
    Comment.
        find({questionId:req.query.qid}).
        populate('byUser').
        sort({_id:1}).
        exec(function(err,comments){
            if(!err){
                res.send(200,{
                    comments:comments
                });
            }
        });
});
router.post('/comment',function(req,res,next){
    var comment = new Comment({
        date:Date.now(),
        text:req.body.comment,
        byUser:req.user.id,
        questionId:req.body.qid
    });
    comment.save(function(err){
        if(!err){
            Comment.
                find({questionId:req.body.qid}).
                populate('byUser').
                sort({_id:1}).
                exec(function(err,comments){
                    if(!err){
                        res.send(200,{
                            comments:comments
                        });
                    }
                });
        }
    });
});
router.get('/getQues',function(req,res,next){
    Question
        .find({userID: req.user.id})
        .sort({_id:-1})
        .exec(function(err,questions){
            res.send(200,{
                questions:questions
            });
        });
});

module.exports = router;