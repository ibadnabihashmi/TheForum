var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
var Comment = require('../models/Comment');
var Tag = require('../models/Tag');
var Cat = require('../models/Category');
var express = require('express');
var router = express.Router();

router.post('/school',function(req,res){

    User.findById(req.user.id).exec(function(err,user){
        user.school.push(req.body.school);
        user.save(function(err){
            if(!err){
                res.send(200,{
                    user:user
                });
            }
        });
    });
});
router.post('/work',function(req,res){

    User.findById(req.user.id).exec(function(err,user){
        user.work.push(req.body.work);
        user.save(function(err){
            if(!err){
                res.send(200,{
                    user:user
                });
            }
        });
    });
});
router.post('/info',function(req,res){
    User.findById(req.user.id).exec(function(err,user){
        user.profile = req.body.info.profile;
        user.save(function(err){
            if(!err){
                res.send(200,{
                    user:user
                });
            }
        });
    });
});
router.post('/pass',function(req,res){
    console.log(req.body);
    User.findById(req.user.id).exec(function(err,user){
        user.password = req.body.pass.newPass;
        user.save(function(err){
            if(!err){
                res.send(200,{
                    user:user
                });
            }
        });
    });
});

module.exports = router;