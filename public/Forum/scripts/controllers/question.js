angular.module('the-forum').controller('QstnCtrl',function($scope, $http, $sce, fetchService, sessionService, commentService,$location, postService, $routeParams, $route, userSession, Question, Comments){
    $scope.hideFiveStar = false;
    $scope.rating = 0;
    $scope.user=userSession;
    $scope.Question=Question;
    $scope.comments=Comments;
    var q = $scope.Question.question;
/*    var matchTags = q.match(/(^#|[^&]#)([a-z0-9]+)/gi);
    matchTags.forEach(function(tag){
        q = q.replace(tag.trim(),'<a href="/tags/showTags/'+tag.slice(2,tag.length)+'">'+tag.trim()+'</a>');
    });*/
//    console.log(matchTags);

//    $scope.Question.question = q;
    $scope.getTheQuestion= function(){
        return $sce.trustAsHtml($scope.Question.question);
    };
    $scope.ratings = [{
        current: $scope.Question.rating.average,
        max: 5
    }];
    if($scope.user){
        if($scope.Question.rating.ratedBy.indexOf($scope.user._id) != -1){
            $scope.hideFiveStar = true;
        }
    }
    $scope.comment=function(){
        var data = {
            qid: $routeParams.qid,
            comment: $scope.aComment
        };
        if($scope.codeEditor){
            data.code = $scope.commentCode;
        }
        commentService.postComment(data).then(function(response){
            $scope.comments = response;
            $scope.aComment = '';
            $scope.commentCode = '';
            $scope.codeEditor = false;
        });
    };
    var voteRedirect=function(routeSelect, comment){
        commentService.commentVote(routeSelect, comment);
        $route.reload();
    };

    $scope.upVote = function(comment,index){
        $scope.comments[index].likes.length++;
        voteRedirect('thumbsUp', comment);
    };
    $scope.downVote = function(comment,index){
        $scope.comments[index].dislikes.length++;
        voteRedirect('thumbsDown', comment);
    };


    $scope.canComment = function(comment){
        if((comment.likes.indexOf($scope.user._id) != -1) || (comment.dislikes.indexOf($scope.user._id) != -1)) return false;
        return true;
    };
     /*   $scope.getSelectedRating = function (rating) {
            postService.rate({
                rating:Number(rating),
                qid:$scope.Question._id
            }).then(function(res){
                $scope.Question = res.data.question;
                $scope.hideFiveStar = true;
                $scope.ratings = [{
                    current: $scope.Question.rating.average,
                    max: 5
                }];
            });
        };*/

});
