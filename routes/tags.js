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
//,render(' - matched tags')
router.get('/showTags/:tag',render(' - matched tags'));

router.get('/fetchTaggedQues/:tag',function(req,res){
    Question
        .find({tags:req.params.tag})
        .populate('userID username email profile to')
        .sort({_id:-1})
        .exec(function(err,q){
            res.send(200,{
                q:q
            });
        });
});

module.exports = router;