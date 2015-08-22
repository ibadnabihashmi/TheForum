angular.module('the-forum').factory('commentService', function($http){
    return{
        postComment: function(data){
            return $http.post('/account/comment', data).then(function(res){
                return res.data.comments;
            });
        },
        notifyUser: function(notifyData){
            return $http.post('/account/'+notifyData.username+'/notify' +
                '?qUser='+ notifyData.qUser +
                '&qId='+ notifyData.qId +
                '&postedBy='+ notifyData.postedBy).then(function(res){
                return res.data;
            });
        }
    }
});