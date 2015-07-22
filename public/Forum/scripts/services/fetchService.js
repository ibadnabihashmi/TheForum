angular.module('the-forum').factory('fetchService', function($http, $location){
    return{
        fetchQuestion: function(){
            return $http.get('/explore/question?qid='+$location.search().qid).then(function(res){
                return res.data.question;
            });
        },
        fetchComments: function(){
            return $http.get('/explore/getComments?qid='+$location.search().qid).then(function(res){
                return res.data.comments;
            });
        },
        getAllQuestions: function(){
            return $http.get('/explore/getAllQues').then(function(res){
                return res.data.questions;
            });
        }
    }
});