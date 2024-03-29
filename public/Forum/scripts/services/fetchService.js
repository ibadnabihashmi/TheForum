angular.module('the-forum').factory('fetchService', function($http, $routeParams, $route){
    return{
        getUserQuestions: function(){
            return $http.get('/account/'+$routeParams.username+'/getQues').then(function(res){
                return res.data.questions;
            });
        },
        getUserPolls: function(){
            return $http.get('/poll/getPolls').then(function(res){
                return res.data.polls;
            });
        },
        fetchQuestion: function(){
            return $http.get('/explore/question?qid='+$route.current.params.qid).then(function(res){
                return res.data.question;
            });
        },
        fetchTaggedQuestions: function(){
            return $http.get('/tags/fetchTaggedQues/'+$routeParams.tag).then(function(res){
                return res;
            });
        },
        fetchPoll: function(){
            return $http.get('/explore/poll/'+$routeParams.pid).then(function(res){
                return res.data.poll;
            });
        },
        fetchComments: function(){
            return $http.get('/explore/getComments?qid='+$route.current.params.qid).then(function(res){
                return res.data.comments;
            });
        },
        fetchAllPollComments: function(){
            return $http.get('/explore/getPollComments/'+$routeParams.pid).then(function(res){
                return res;
            });

        },
        fetchUserPosts: function(data){
            return $http.post('/account/'+$routeParams.username+'/getUserPosts',data).then(function(res){
                return res;
            });
        },
        fetchAskedPosts: function(data){
            return $http.post('/account/'+$routeParams.username+'/getAskedPosts',data).then(function(res){
                return res;
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
        },
        matchingUser: function(data){
            return $http.post('/explore/getMatchedUsers',data).then(function(res){
                return res;
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