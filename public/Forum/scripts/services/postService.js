angular.module('the-forum').factory('postService', function($http){
    return{
        postPoll: function(data){
            return $http.post('/poll/new', data).then(function(res){
                return res
            });
        },
        vote: function(data){
            return $http.post('/poll/vote', data).then(function(res){
                return res;
            });
        },
        comment: function(data){
            return $http.post('/poll/comment', data).then(function(res){
                return res;
            });
        }
    }
});