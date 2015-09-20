(function(){
    angular.module('the-forum').controller('QstnCtrl',function($scope, $http,$sce, fetchService, sessionService, commentService, postService, $routeParams){
        $scope.hideFiveStar = false;
        $scope.rating = 0;

        sessionService.getSessionInfo().then(function (response) {
            $scope.user=response;
        });
        fetchService.fetchQuestion().then(function (response) {
            $scope.Question=response;
            var q = $scope.Question.question;
            var matchTags = q.match(/(^#|[^&]#)([a-z0-9]+)/gi)
            matchTags.forEach(function(tag){
                q = q.replace(tag.trim(),'<a href="/tags/showTags/'+tag.slice(2,tag.length)+'">'+tag.trim()+'</a>');
            });
            $scope.Question.question = q;
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
        });

        fetchService.getAllQuestions().then(function (response) {
            $scope.allQuestions=response;
        });

        var fetchComments = function(){
            fetchService.fetchComments().then(function (response) {
                $scope.comments=response;
            });
        };

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
            var notifyData={
                postedBy: $scope.user.username,
                qUser: $scope.Question.userID._id,
                qId: $scope.Question._id
            };
            commentService.notifyUser(notifyData);
        };

        $scope.clickForTags = function(){
            fetchService.getAllTags().then(function(response){
                $scope.tags = response.data.tags;
            });
        };

        $scope.clickForCats = function(){
            fetchService.getAllCats().then(function(response){
                $scope.cats = response.data.cats;
            });
        };

        $scope.fetchQuestionsFromTag = function(id){
            $('ul.tabs').tabs('select_tab', 'questions');
            $scope.allQuestions = [];
            fetchService.getQuestionsFromTag(id).then(function(response){
                $scope.allQuestions=response;
            });
        };

        $scope.fetchQuestionsFromCat = function(id){
            $('ul.tabs').tabs('select_tab', 'questions');
            $scope.allQuestions = [];
            fetchService.getQuestionsFromCat(id).then(function(response){
                $scope.allQuestions=response;
            });
        };

        $scope.upVote = function(comment,index){
            $scope.comments[index].likes.length++;
            $http.post('/question/thumbsUp',{comment:comment}).then(function(res){
                fetchComments();
            });
        };

        $scope.downVote = function(comment,index){
            $scope.comments[index].dislikes.length++;
            $http.post('/question/thumbsDown',{comment:comment}).then(function(res){
                fetchComments();
            });
        };

        $scope.canComment = function(comment){
            if((comment.likes.indexOf($scope.user._id) != -1) || (comment.dislikes.indexOf($scope.user._id) != -1)){
                return false;
            }else{
                return true;
            }
        };
        $scope.getSelectedRating = function (rating) {
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

        };
        fetchComments();
    });
})();