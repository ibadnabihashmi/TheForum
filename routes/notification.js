var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
var Question = require('../models/Question');
var SecondaryUser = require('../models/SecondaryUser');
var Tag = require('../models/Tag');
var express = require('express');
var router = express.Router();
var findInd = function(a,b){
    for(var i=0;i<a.length;i++){
        if(a[i].notifID.toString() === b.toString()){
            return i;
        }else{
            console.log(a[i].notifID);
            console.log(b);
            console.log(typeof a[i].notifID);
            console.log(typeof b);
        }
    }
    return -1;
};
router.post('/comment',function(req,res){
    var notifyUser = function(req,res,isSec,noti,done){
        if(isSec){
            async.eachSeries(noti.primaryUsers,function(thisUser,callback){
                User.findById(thisUser).exec(function(err,user){
                    var index = findInd(user.notifications,noti._id);
                    if(index != -1){
                        user.notifications[index].time = Date.now();
                        user.notifications[index].read = false;
                        user.notifSeen = false;
                        user.notifications[index].commentID.push(req.body.addedCommentId);
                        user.notifications[index].message = req.user.username+' has said something here on this question';
                    }else{
                        var obj = {
                            notifID:noti._id,
                            assocPost:noti.assocPost,
                            time:Date.now(),
                            commentID:  req.body.addedCommentId,
                            message:req.user.username+' has said something here on this question',
                            notificationFor:'comment'
                        };
                        user.notifSeen = false;
                        user.notifications.push(obj);
                    }
                    user.save(function(err){
                        if(err){
                            callback();
                        }else{
                            callback();
                        }
                    });
                });
            },function(err){
                if(!err){
                    done();
                }else{
                    res.send(500);
                }
            })
        }else{
            async.eachSeries(_.union(noti.primaryUsers,noti.secondaryUsers),function(thisUser,callback){
                if(req.user.id != thisUser){
                    User.findById(thisUser).exec(function(err,user){
                        var index = findInd(user.notifications,noti._id);
                        if(index != -1){
                            user.notifications[index].time = Date.now();
                            user.notifications[index].read = false;
                            user.notifSeen = false;
                            user.notifications[index].commentID.push(req.body.addedCommentId);
                            user.notifications[index].message = req.user.username+' has said something here on this question';
                        }else{
                            var obj = {
                                notifID:noti._id,
                                assocPost:noti.assocPost,
                                time:Date.now(),
                                commentID: req.body.addedCommentId,
                                message:req.user.username+' has said something here on this question',
                                notificationFor:'comment'
                            };
                            user.notifSeen = false;
                            user.notifications.push(obj);
                        }
                        user.save(function(err){
                            if(err){
                                callback();
                            }else{
                                callback();
                            }
                        });
                    });
                }else{
                    callback();
                }
            },function(err){
                if(!err){
                    done();
                }else{
                    res.send(500);
                }
            });
        }
    };
    SecondaryUser
        .findOne({assocPost:req.body.question})
        .exec(function(err,notif){
            if(notif){
                if(notif.primaryUsers.indexOf(req.user.id) == -1){
                    if(notif.secondaryUsers.indexOf(req.user.id) == -1){
                        notif.secondaryUsers.push(req.user.id);
                        notif.save(function(err){
                            if(!err){
                                notifyUser(req,res,true,notif,function(){
                                    res.send(200);
                                });
                            }else{
                                res.send(500)
                            }
                        });
                    }else{
                        notifyUser(req,res,true,notif,function(){
                            res.send(200);
                        });
                    }
                }else{
                    notifyUser(req,res,false,notif,function(){
                        res.send(200);
                    });
                }

            }else{
                var notification = new SecondaryUser();
                notification.assocPost = req.body.question._id;
                notification.primaryUsers.push(req.body.question.userID);
                if(req.body.question.to.length > 0)notification.primaryUsers = _.union(notification.primaryUsers,req.body.question.to);
                if(notification.primaryUsers.indexOf(req.user.id) == -1){
                    notification.secondaryUsers.push(req.user.id);
                    notification.save(function(err){
                        if(!err){
                            notifyUser(req,res,true,notification,function(){
                                res.send(200);
                            });
                        }else{
                            res.send(500)
                        }
                    });
                }else{
                    notification.save(function(err){
                        if(!err){
                            notifyUser(req,res,false,notification,function(){
                                res.send(200);
                            });
                        }else{
                            res.send(500);
                        }
                    });

                }
            }
        });
});
router.post('/askNotify',function(req,res){
    var arr = [];
    arr.push(req.user.id);
    var secondary = new SecondaryUser();
    secondary.primaryUsers = _.union(req.body.question.to,arr);
    secondary.secondaryUsers = [];
    secondary.assocPost = req.body.question._id;

    secondary.save(function(err){
        if(!err){
            async.each(req.body.question.to,function(thisUser,callback){
                User.findById(thisUser).exec(function(err,user){
                    user.notifSeen = false;
                    var obj = {
                        notifID:secondary._id,
                        assocPost:secondary.assocPost,
                        time:Date.now(),
                        message:req.user.username+' has asked you this question, "'+req.body.question.question+'"',
                        notificationFor:'ask'
                    };
                    user.notifications.push(obj);
                    user.save(function(err){
                        if(!err){
                            callback();
                        }else{
                            res.send(500);
                        }
                    });
                });
            },function(err){
                if(!err){
                    res.send(200);
                }else{
                    res.send(500);
                }
            });
        }else{
            res.send(500);
        }
    });
});
router.post('/followNotif',function(req,res){
    User.findById(req.body.otherUser._id).exec(function(err,user){
        user.notifSeen = false;
        var obj = {
            time:Date.now(),
            message:req.user.username+' is now following you!',
            notificationFor:'follow'
        };
        user.notifications.push(obj);
        user.save(function(err){
            if(!err){
                res.send(200);
            }else{
                res.send(500);
            }
        });
    });
});
router.get('/check',function(req,res){
    User
        .findById(req.user.id)
        .select('notifications')
        .exec(function(err,user){
            if(_.find(user.notifications,{read:false}) == undefined){
                res.send(200,{
                    newNotif:false
                });
            }else{
                res.send(200,{
                    newNotif:true
                });
            }
        });
});
router.get('/getNotifs',function(req,res){
    User.
        findById(req.user.id).
        select('-password').
        exec(function(err,user){
            user.notifSeen = true;
            user.save(function(err){
                if(!err){
                    res.send(200,{
                        user:user,
                        notifications:user.notifications
                    });
                }else{
                    res.send(500);
                }
            });
        });
});
module.exports = router;