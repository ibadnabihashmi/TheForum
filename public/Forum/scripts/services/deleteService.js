angular.module('the-forum').factory('deleteService', function($http){
    return{
        deleteQuestion: function(id){
            return $http.get('/question/deleteQuestion?qid='+id).then(function(){

            });
        },
        deletePoll: function(id){
            console.log(id);
            return $http.get('/poll/deletePoll?pid='+id).then(function(){

            });

        },
        deleteComment: function(id){
            return $http.get('/question/deleteComment?cid='+id).then(function(){

            });
        }
    }
});