angular.module('the-forum').factory('commentService', function($http){
    return{
        postComment: function(data){
            return $http.post('/account/comment', data).then(function(res){
                var commentObject={
                    comments: res.data.comments,
                    addedCommentId: res.data.addedCommentId
                };
                return  commentObject;
            });
        },
        commentVote: function(routeSelect, comment){
            return $http.post('/question/'+routeSelect,{ comment : comment }).then(function(res){
                return res;
            });
        }
    }
});