angular.module('the-forum').controller('QstnCtrl',['$rootScope','$scope','$http','$location',function($rootScope,$scope,$http,$location){
    $scope.Question;
    $scope.comments = [];
    var fetchQs = function(){
        $http.get('/account/question?qid='+$location.search().qid).then(function(res){
            $scope.Question = res.data.question;
        });
    };
    var fetchAllComments = function(){
        $http.get('/account/getComments?qid='+$location.search().qid).then(function(res){
            $scope.comments = res.data.comments;
        });
    };
    var init = function(){
        fetchQs();
        fetchAllComments();
    };
    $scope.comment = function(){
        var data = {
            qid:$location.search().qid,
            comment: $scope.aComment
        };
        $http.post('/account/comment',data).then(function(res){
            $scope.comments = res.data.comments;
            $scope.aComment = '';
        });
    };
    init();
}]);