angular.module('the-forum').controller('AskCtrl',['$scope','$http',function($scope,$http){

    var getAllQues = function(){
        $http.get('/account/getQues')
            .then(function(res){
                $scope.qs = res.data.questions;
            });
    };
    $scope.post = function(){
        var question = {
            text : $scope.question,
            tags : $scope.tags
        };
        $http.post('/account/ask',question)
            .then(function(res){
                getAllQues();
            });
    };
    getAllQues();
}]);