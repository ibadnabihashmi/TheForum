angular.module('the-forum').controller('QstnCtrl',function($scope, $http, $location, fetchService, sessionService, commentService){
    sessionService.getSessionInfo().then(function (response) {
        $scope.user=response;
    });

    fetchService.fetchQuestion().then(function (response) {
        $scope.Question=response;
    });

    fetchService.getAllQuestions().then(function (response) {
        $scope.allQuestions=response;
    });

    fetchService.fetchComments().then(function (response) {
        $scope.comments=response;
    });
    $scope.comment=function(){
        var data = {
            qid: $location.search().qid,
            comment: $scope.aComment
        };
        commentService.postComment(data).then(function(response){
            $scope.comments = response;
            $scope.aComment = '';
        });
        commentService.notifyUser();
    };
});