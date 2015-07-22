angular.module('the-forum').controller('QstnCtrl',function($scope, $http, $location, fetchService, sessionService){
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

    $scope.comment= function(){
        var data = {
            qid: $location.search().qid,
            comment: $scope.aComment
        };
        console.log($scope.aComment);
        $http.post('/account/comment', data).then(function(res){
            $scope.comments = res.data.comments;
            $scope.aComment= '';
        });
    };
});