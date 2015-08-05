angular.module('the-forum').controller('AskCtrl',['$scope','$http',function($scope,$http){
    $scope.select = {
        choices : [
            "science",
            "cuture",
            "gossip",
            "paparazzi",
            "showbiz",
            "share market"
        ]
    };
    var getAllQues = function(){
        $http.get('/account/getQues')
            .then(function(res){
                $scope.qs = res.data.questions;
            });
    };
    $scope.post = function(){
        var tags = [];
        var yolo ;
        if($scope.question.match(/(^#|[^&]#)([a-z0-9]+)/gi) != null){
            $scope.question.match(/(^#|[^&]#)([a-z0-9]+)/gi).forEach(function(i){
                yolo = i.trim();
                tags.push(yolo.slice(1, yolo.length));
            });
        }else{
            tags = [];
        }

        var question = {
            text : $scope.question,
            tags : tags.join(),
            category : $scope.select.value1
        };
alert("yolo");
        $http.post('/account/ask',question)
            .then(function(res){
                alert("yolo");
                getAllQues();
            });
    };
    getAllQues();
}]);