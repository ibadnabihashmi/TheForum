var _ = require('lodash');
var async = require('async');
var People = require('../models/People');
var express = require('express');
var path = require('path');

exports.getRealCrap = function(req,res){
    res.render('peoplePost');
};
exports.counterup = function(req,res){
    People.findById(req.body.post).exec(function(err,post){
        if(post){
            post.counter = post.counter+1;
            post.save(function(err){
                res.send(200,{
                    post:post
                });
            });
        }
    });
};
exports.blogpost = function(req,res){
    var post = new People({
        title : req.body.title,
        urlTitle : req.body.title.split(" ").join("-"),
        text : req.body.text,
        imglink : req.body.imglink?req.body.imglink:undefined,
        imgpath : req.files.image?req.files.image.name:undefined,
        counterText: req.body.counter?req.body.counter:undefined
    });
    post.save(function(err){
        if(!err){
            res.send(200);
        }
    });

};
exports.getBlogPosts = function(req,res){
    var blogs = [];
    People.find().exec(function(err,posts){
        async.eachSeries(posts,function(post,callback){
            var obj = 'http://www.queb.co/people/'+post.urlTitle+'/'+post._id;
            blogs.push(obj);
            callback();
        },function(err){
            if(!err){
                res.render('allBlogs',{
                    posts:blogs
                });
            }
        });
    });
};
exports.getBlog = function(req,res){
    People
        .findById(req.params.id)
        .exec(function(err,post){
            res.render('people',{
                post:post
            });
        });
};
