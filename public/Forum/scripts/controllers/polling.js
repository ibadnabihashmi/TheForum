angular.module('the-forum').controller('PollingController', function($scope, $http,$sce , $routeParams, postService, fetchService, sessionService){
    $scope.showPollOpt = true;
    sessionService.getSessionInfo().then(function (response) {
        $scope.user = response;
    });
    var fetchPoll = function(){
        fetchService.fetchPoll().then(function (response) {
            $scope.poll = response;
            var q = $scope.poll.question;
            var matchTags = q.match(/(^#|[^&]#)([a-z0-9]+)/gi)
            matchTags.forEach(function(tag){
                q = q.replace(tag.trim(),'<a href="/tags/showTags/'+tag.slice(2,tag.length)+'">'+tag.trim()+'</a>');
            });
            $scope.poll.question = q;
            $scope.getThePoll= function(){
                return $sce.trustAsHtml($scope.poll.question);
            };
            for(var i=0;i<$scope.poll.options.length;i++){
                if($scope.poll.options[i].votes.indexOf($scope.user._id) != -1){
                    $scope.user.side = i;
                    $scope.showPollOpt = false;
                    break;
                }
            }
        });
    };
    var fetchPollComments = function(){
        fetchService.fetchAllPollComments().then(function(res){
            $scope.comments = res.data.comments;
        });
    };
    $scope.vote = function(id){
        if($scope.showPollOpt){
            $scope.showPollOpt = false;
            postService.vote({
                pollId:$scope.poll._id,
                pollOptId:id
            }).then(function(res){
                $scope.user.side = id;
                fetchPoll();
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
    $scope.upVote = function(comment,index){
        $scope.comments[index].likes.length++;
        $http.post('/question/thumbsUp',{comment:comment}).then(function(res){
            fetchPollComments();
        });
    };

    $scope.downVote = function(comment,index){
        $scope.comments[index].dislikes.length++;
        $http.post('/question/thumbsDown',{comment:comment}).then(function(res){
            fetchPollComments();
        });
    };

    $scope.canComment = function(comment){
        if((comment.likes.indexOf($scope.user._id) != -1) || (comment.dislikes.indexOf($scope.user._id) != -1)){
            return false;
        }else{
            return true;
        }
    };
    fetchPoll();
    fetchPollComments();
});