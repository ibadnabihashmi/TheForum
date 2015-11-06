var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
var Comment = require('../models/Comment');
var Tag = require('../models/Tag');
var Cat = require('../models/Category');
var Poll = require('../models/Poll');
var express = require('express');
var router = express.Router();

function renderExplore(req,res){
    res.render('Forum', {
        title: 'Explore'
    });
}
router.get('/', renderExplore);
router.get('/questionPage/:qid', renderExplore);
router.get('/pollPage/:pid', renderExplore);

router.get('/getAllQues',function(req,res,next){
    Question
        .find()
        .sort({_id:-1})
        .exec(function(err,questions){
            res.send(200,{
                questions:questions
            });
        });
});
router.get('/getComments',function(req,res){
    Comment.
        find({questionId:req.query.qid}).
        populate('byUser', 'username email profile').
        sort({_id:1}).
        exec(function(err,comments){
            if(!err){
                res.send(200,{
                    comments:comments
                });
            }
        });
});

router.get('/question',function(req,res,next){
        Question.findById(req.query.qid).populate('userID username email profile to').exec(function(err,ques){
            User.
                findById(ques.userID).exec(function(err,user){
                    var ind = _.findIndex(user.notifications,function(chr) {
                        return chr.assocPost == req.query.qid;
                    });
                    if(ind != -1){
                        user.notifications[ind].read = true;
                        user.save(function(err){
                            if(!err){
                                res.send(200,{
                                    question:ques
                                });
                            }else{
                                console.log(err);
                                res.send(200,{
                                    question:ques
                                });
                            }
                        });
                    }else{
                        console.log("self made billionaire"+ind);
                        res.send(200,{
                            question:ques
                        });
                    }
                });
        });
});
router.get('/poll/:pid',function(req,res,next){
    Question.findById(req.params.pid).populate('userID', 'username email profile').exec(function(err,response){
        res.send(200,{
            poll:response
        });
    });
});
router.get('/getPollComments/:pid',function(req,res){
    Comment.
        find({questionId:req.params.pid}).
        populate('byUser', 'username email profile').
        sort({_id:1}).
        exec(function(err,comments){
            if(!err){
                res.send(200,{
                    comments:comments
                });
            }
        });
});
router.post('/getMatchedUsers',function(req,res){
    User.
        find({"username":{ "$regex": req.body.match, "$options": "i" }}).
        sort({_id:-1}).
        exec(function(err,user){
            if(user){
                return res.send(200,{
                    users:user
                });
            }
        });
});
router.get('/getAllTags',function(req,res){
    Tag
        .find()
        .sort({_id:-1})
        .exec(function(err,tags){
            if(!err){
                return res.send(200,{
                    tags:tags
                });
            }
        });
});
router.get('/getQuesFromTag',function(req,res){
    Tag
        .findById(req.query.id)
        .exec(function(err,tag){
            if(!err){
                Question
                    .find({
                        '_id': { $in: tag.questionsTagged}
                    })
                    .exec(function(err,questions){
                        res.send(200,{
                            questions:questions
                        });
                    })
            }
        });
});
router.get('/getAllCats',function(req,res){
    Cat
        .find()
        .sort({_id:-1})
        .exec(function(err,cats){
            if(!err){
                return res.send(200,{
                    cats:cats
                });
            }
        });
});
router.get('/getQuesFromCat',function(req,res){
    Cat
        .findById(req.query.id)
        .exec(function(err,tag){
            if(!err){
                Question
                    .find({
                        '_id': { $in: tag.questions}
                    })
                    .exec(function(err,questions){
                        res.send(200,{
                            questions:questions
                        });
                    })
            }
        });
});
module.exports = router;