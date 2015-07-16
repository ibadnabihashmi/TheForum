var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
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
router.get('/getQues',function(req,res,next){
    Question
        .find()
        .sort({_id:-1})
        .exec(function(err,questions){
            console.log(questions);
            res.send(200,{
                questions:questions
            });
        });
});

module.exports = router;