angular.module('the-forum').factory('deleteService', function($http){
    return{
        deleteQuestion: function(id){
            return $http.get('/question/deleteQuestion?qid='+id).then(function(response){
            });
        },
        deletePoll: function(id){
            return $http.get('/poll/deletePoll?pid='+id).then(function(){
            });
        },
        deleteComment: function(id, questionById){
            return $http.get('/question/deleteComment?cid='+id+"&questionById="+questionById).then(function(){
            });
        }
    }
});