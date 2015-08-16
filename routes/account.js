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


router.get('/:username',render);
router.get('/:username/ask',render);
router.get('/:username/notification', render);
router.get('/:username/activity', render);
router.get('/:username/settings_profile', render);

router.post('/comment',function(req,res,next){
    var comment = new Comment({
        date:Date.now(),
        text:req.body.comment,
        byUser:req.user.id,
        questionId:req.body.qid
    });
    comment.save(function(err){
        if(!err){
            Comment.find({questionId:req.body.qid}).populate('byUser').sort({_id:1}).exec(function(err,comments){
                if(!err){
                    res.send(200,{
                        comments:comments
                    });
                }
            });
        }
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

function followService(userOne, userTwo, theMethod, theArray){

    User.findByIdAndUpdate(userOne, { theMethod: {theArray: userTwo}
    }).exec(function(e, user){
        return user;
    });
}

router.post('/follow',function(req, res){
    async.parallel([
        function(cb){ User.findByIdAndUpdate(req.user.id, { $addToSet: {following: req.query.userId}}).exec(cb)},
        function(cb){ User.findByIdAndUpdate(req.query.userId, { $addToSet: {followers: req.user.id}}).exec(cb)}
    ], function(err, result){
        if (err) console.log(err);
        else res.send(200,{
            user: "success"
        });
    });
});

router.post('/unfollow',function(req, res){
    async.parallel([
        function(cb){ User.findByIdAndUpdate(req.user.id, { $pull: {following: req.query.userId}}).exec(cb)},
        function(cb){ User.findByIdAndUpdate(req.query.userId, { $pull: {followers: req.user.id}}).exec(cb)}
    ], function(err, result){
        if (err) console.log(err);
        else res.send(200,{
            user: "success"
        });
    });
});


router.post('/:username/notify',function(req, res){
    console.log(req.query.qUser);
    console.log(req.query.qId);
    console.log(req.query.postedBy);
    if(req.query.qUser!=req.user.id){
        User.findByIdAndUpdate(req.query.qUser, { $addToSet:
        {notifications: {qID: req.query.qId,  commentedBy: req.query.postedBy}}
        }).exec(function(e, userInfo){
            res.send(200,{
                userInfo: userInfo
            });
        });
    }
    else{
        //Activity Code here
        console.log("User posted on their own question");
    }

});

router.post('/:username/ask',function(req,res,next){
    var question = new Question({
        question : req.body.text,
        tags : req.body.tags.split(','),
        category : req.body.category,
        date : Date.now(),
        userID : req.user.id,
        type:'question'
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


router.get('/:username/getQues',function(req,res,next){
    Question
        .find({
            userID: req.user.id,
            type: 'question'
        })
        .sort({_id:-1})
        .exec(function(error, questions){
            console.log(error);
            res.send(200,{
                questions:questions
            });
        });
});

router.get('/:username/getUser',function(req,res,next){
    User.findOne({username: req.params.username})
        .select('username email following followers')
        .populate('following followers', 'username')
        .exec(function(error, info){
            res.send(200,{
                userInfo:info
            });
        });
});


module.exports = router;