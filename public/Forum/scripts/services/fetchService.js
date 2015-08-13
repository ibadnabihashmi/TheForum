angular.module('the-forum').factory('fetchService', function($http, $routeParams){
    return{
        getUserQuestions: function(){
            return $http.get('/account/'+$routeParams.username+'/getQues').then(function(res){
                return res.data.questions;
            });
        },
        fetchQuestion: function(){
            return $http.get('/explore/question?qid='+$routeParams.qid).then(function(res){
                return res.data.question;
            });
        },
        fetchComments: function(){
            return $http.get('/explore/getComments?qid='+$routeParams.qid).then(function(res){
                return res.data.comments;
            });
        },
        getAllQuestions: function(){
            return $http.get('/explore/getAllQues').then(function(res){
                return res.data.questions;
            });
        },
        getNotifications: function(){
            return $http.get('/account/getNotifications').then(function(res){
                return res.data.n;
            });
        },
        getAllTags : function(){
            return $http.get('/explore/getAllTags').then(function(tags){
                return tags;
            });
        },
        getAllCats : function(){
            return $http.get('/explore/getAllCats').then(function(cats){
                return cats;
            });
        },
        getQuestionsFromTag: function(id){
            return $http.get('/explore/getQuesFromTag?id='+id).then(function(ques){
                return ques.data.questions;
            });
        },
        getQuestionsFromCat: function(id){
            return $http.get('/explore/getQuesFromCat?id='+id).then(function(ques){
                return ques.data.questions;
            });
        }
        /*      getActivity: function(){
         return $http.get('/account/getActivity').then(function(res){
         //console.log(res.data);
         return res.data.a;
         });
         },
         */

    }
});