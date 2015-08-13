var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
var Comment = require('../models/Comment');
var Category = require('../models/Category');

var Tag = require('../models/Tag');
var express = require('express');
var router = express.Router();


function render(req,res){
    res.render('Forum', {
        title: 'Account Management',
        user: req.user
    });
}

router.get('/',render);
router.get('/ask',render);
router.get('/notification', render);
router.get('/activity', render);
router.get('/profile', render);


router.post('/ask',function(req,res,next){
    var question = new Question({
        question : req.body.text,
        tags : req.body.tags.split(','),
        category : req.body.category,
        date : Date.now(),
        userID : req.user.id
    });
    question.save(function(err){
        if(!err){
            var saveTags = function(){
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
            };
            Category
                .find({name:req.body.category})
                .exec(function(err,cat){

                    if(cat.length > 0){
                        cat[0].questions.push(question._id);
                        cat[0].save(function(err){
                            if(!err){

                                saveTags();
                            }else{
                                res.send(500);
                            }
                        });
                    }else{
                        var _cat = new Category({
                            name:req.body.category
                        });
                        _cat.questions.push(question._id);
                        _cat.save(function(err){
                            if(!err){

                                saveTags();
                            }else{
                                res.send(500);
                            }
                        });
                    }
                });

        }else{
            res.send(500);
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
/*
 router.post('/notify',function(req,res,next){
 Question.findById(req.query.qid).exec(function(err,questionInfo){
 Notification.findOneAndUpdate({ userId: questionInfo.userID }, { $addToSet:
 { n: {question: questionInfo.question,  byUser: req.user.email, date: Date.now(), comment: req.body.comment}}
 }).exec(function(e, response){
 //console.log(userInfo);
 res.send(200,{
 data: response
 });
 });

 });
 });
 */



router.post('/notify',function(req,res,next){

    Question.findById(req.query.qid).exec(function(err,questionInfo){
        if(questionInfo.userID!=req.user.id){
            User.findByIdAndUpdate(questionInfo.userID, { $addToSet:
            {notifications: {qID: req.query.qid,  commentedBy: req.user.email }}
            }).exec(function(e, userInfo){
                res.send(200,{
                    userInfo: userInfo
                });
            });
        }
        else{
            //Activity Code here

        }
    });
});


router.get('/getQues',function(req,res,next){
    Question
        .find({userID: req.user.id})
        .sort({_id:-1})
        .exec(function(error, questions){
            res.send(200,{
                questions:questions
            });
        });
});
router.get('/getNotifications',function(req,res,next){
    User.findById(req.user.id, 'notifications -_id')
        .populate('notifications.qID', 'question')
        .exec(function(error, response){
            res.send(200,{
                n: response.notifications
            });
        });
});
router.get('/getActivity',function(req,res,next){
    User.findById(req.user.id, 'activity -_id')
        .populate('activity.qID', 'question')
        .exec(function(error, response){
            res.send(200,{
                a: response.activity
            });
        });
});

module.exports = router;