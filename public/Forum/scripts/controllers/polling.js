angular.module('the-forum').controller('PollingController', function($scope, $http, $routeParams, postService, fetchService, sessionService){
    $scope.showPollOpt = true;
    sessionService.getSessionInfo().then(function (response) {
        $scope.user = response;
    });
    fetchService.fetchPoll().then(function (response) {
        $scope.poll = response;
        for(var i=0;i<$scope.poll.options.length;i++){
            if($scope.poll.options[i].votes.indexOf($scope.user._id) != -1){
                $scope.user.side = i;
                $scope.showPollOpt = false;
                break;
            }
        }
    });
    fetchService.fetchAllPollComments().then(function(res){
        $scope.comments = res.data.comments;
    });
    $scope.vote = function(id){
        if($scope.showPollOpt){
            $scope.showPollOpt = false;
            postService.vote({
                pollId:$scope.poll._id,
                pollOptId:id
            }).then(function(res){
                $scope.user.side = id;
            });
        }
    };
    $scope.pollComment = function(){
        postService.comment({
            text: $scope.aComment,
            for: 'poll',
            side: $scope.user.side,
            qid: $scope.poll._id
        }).then(function(res){
            $scope.aComment = '';
            $scope.comments = res.data.comments;
        });
    };
});