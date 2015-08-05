var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
var Comment = require('../models/Comment');
var Tag = require('../models/Tag');
var Cat = require('../models/Category');
var express = require('express');
var router = express.Router();

function renderExplore(req,res){
    console.log('explore test');
    res.render('Forum', {
        title: 'Explore'
    });
}

router.get('/', renderExplore);
router.get('/questionPage', renderExplore);

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

router.get('/question',function(req,res,next){
    Question.findById(req.query.qid).exec(function(err,response){
        res.send(200,{
            question:response
        });
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