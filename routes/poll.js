var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
var Comment = require('../models/Comment');
var Category = require('../models/Category');
var Tag = require('../models/Tag');
var express = require('express');
var router = express.Router();

function render(title){
   return function(req,res){
       return res.render('Forum', {
           title: title,
           user: req.user
       });
   }
}
router.get('/',render(' - poll'));

router.post('/new',function(req,res){

    var poll = new Question({
        question : req.body.poll.text,
        tags : req.body.poll.tags.split(','),
        category : req.body.poll.category,
        date : Date.now(),
        userID : req.user.id,
        type: 'poll'
    });
    poll.options.push({
        text:req.body.poll.opt1,
        comments:[]
    });
    poll.options.push({
        text:req.body.poll.opt2,
        comments:[]
    });
    poll.save(function(err){
        if(!err){
            var saveTags = function(){
                async.each(req.body.poll.tags.split(','),function(tag,callback){
                    Tag.find({name:tag})
                        .exec(function(err,tags){
                            if(tags.length > 0){
                                tags[0].questionsTagged.push(poll._id);
                                tags[0].save(function(err){
                                    if(!err){
                                        callback();
                                    }
                                });
                            }else{
                                var _tag = new Tag({
                                    name:tag
                                });
                                _tag.questionsTagged.push(poll._id);
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
                .find({name:req.body.poll.category})
                .exec(function(err,cat){

                    if(cat.length > 0){
                        cat[0].questions.push(poll._id);
                        cat[0].save(function(err){
                            if(!err){

                                saveTags();
                            }else{
                                res.send(500);
                            }
                        });
                    }else{
                        var _cat = new Category({
                            name:req.body.poll.category
                        });
                        _cat.questions.push(poll._id);
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
router.get('/getPolls',function(req,res){
    Question
        .find({userID: req.user.id,type:'poll'})
        .sort({_id:-1})
        .exec(function(error, polls){
            console.log(error);
            res.send(200,{
                polls:polls
            });
        });
});
router.post('/vote',function(req,res){
    Question
        .findOne({
            "_id":req.body.pollId,
            "type":"poll"
        })
        .exec(function(err,poll){
            poll.options[req.body.pollOptId].votes.push(req.user.id);
            poll.save(function(err){
                if(!err){
                    res.send(200);
                }else{
                    res.send(500);
                }
            });
        });
});

router.post('/comment',function(req,res){
    var comment = new Comment({
        text: req.body.text,
        date : Date.now(),
        for : req.body.for,
        side : req.body.side,
        questionId: req.body.qid,
        byUser: req.user.id
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

module.exports = router;