angular.module('the-forum').controller('AskCtrl', function($scope, $http, $routeParams, fetchService){
    $scope.select = {
        choices : ["science", "cuture", "gossip", "paparazzi", "showbiz", "share market"]
    };
    $scope.showCodeEditor = false;
    $scope.plscode = "//write or paste code here;";
    var getUserQuestions=function(){
        fetchService.getUserQuestions().then(function (response) {
            $scope.qs=response;
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
        if($scope.showCodeEditor){
            question.code = $scope.plscode;
        }
        $http.post('/account/:username/ask',question)
            .then(function(res){
                getUserQuestions();
            });
    };

    $scope.showEditor = function(bool){
        $scope.showCodeEditor = bool;
        if(!bool){
            $scope.codeModel = '';
        }
    };


    getUserQuestions();
});