angular.module('the-forum').factory('commentService', function($http){
    return{
        postComment: function(data){
            return $http.post('/account/comment', data).then(function(res){
                return res.data.comments;
            });
        },
        notifyUser: function(notifyData){
            return $http.post('/account/'+notifyData.username+'/notify' +
                '?toUser='+ notifyData.toUser +
                '&associatedID='+ notifyData.associatedID +
                '&commentedBy='+ notifyData.commentedBy+
                '&type='+ notifyData.type).then(function(res){
                    return res.data;
                });
        },
        commentVote: function(routeSelect, comment){
            return $http.post('/question/'+routeSelect,{ comment : comment }).then(function(res){
                return res;
            });
        }
    }
});