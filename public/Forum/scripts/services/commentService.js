angular.module('the-forum').factory('commentService', function($http, $location){
    return{
        postComment: function(data){
            return $http.post('/account/comment', data).then(function(res){
                return res.data.comments;
            });
        },
        notifyUser: function(data){
            return $http.post('/account/notify?qid='+$location.search().qid).then(function(res){
                return res.data;
            });
        }
    }
});