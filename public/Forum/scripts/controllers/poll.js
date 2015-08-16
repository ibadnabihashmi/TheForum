angular.module('the-forum').controller('PollController', function($scope, $http, $routeParams, postService, fetchService){
    $scope.select = {
        choices : ["science", "cuture", "gossip", "paparazzi", "showbiz", "share market"]
    };

    var getUserPolls=function(){
        fetchService.getUserPolls().then(function (response) {
            $scope.polls=response;
        });
    };
    $scope.createPoll = function(){
        var tags = [];
        var yolo ;
        if($scope.Poll.text.match(/(^#|[^&]#)([a-z0-9]+)/gi) != null){
            $scope.Poll.text.match(/(^#|[^&]#)([a-z0-9]+)/gi).forEach(function(i){
                yolo = i.trim();
                tags.push(yolo.slice(1, yolo.length));
            });
        }else{
            tags = [];
        }
        $scope.Poll.category = $scope.select.value1;
        $scope.Poll.tags = tags.join();
        postService.postPoll({
            poll:$scope.Poll
        })
            .then(function(res){
                if(res.status == 200){
                    getUserPolls();
                }
            });
    };
    getUserPolls();
});