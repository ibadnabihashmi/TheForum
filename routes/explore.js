var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
var Comment = require('../models/Comment');
var Tag = require('../models/Tag');
var express = require('express');
var router = express.Router();

function renderExplore(req,res){
    console.log('explore test');
    res.render('Forum', {
        title: 'Explore'
    });
}

router.get('/',renderExplore);

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

module.exports = router;