(function(){
    angular.module('the-forum').controller('QstnCtrl',function($scope, $http, fetchService, sessionService, commentService, $routeParams){
        sessionService.getSessionInfo().then(function (response) {
            $scope.user=response;
        });
        fetchService.fetchQuestion().then(function (response) {
            $scope.Question=response;
            console.log(response);
        });

        fetchService.getAllQuestions().then(function (response) {
            $scope.allQuestions=response;
        });

        fetchService.fetchComments().then(function (response) {
            $scope.comments=response;
        });

        $scope.comment=function(){
            var data = {
                qid: $routeParams.qid,
                comment: $scope.aComment
            };
            commentService.postComment(data).then(function(response){
                $scope.comments = response;
                $scope.aComment = '';
            });
            console.log($scope.Question);
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

        $scope.thumbsUp = function(question){
            $('#thumbsUp').addClass('disabled');
            $('#thumbsDown').removeClass('disabled');
            $http.post('/question/thumbsUp',{question:question}).then(function(res){
            });
        };

        $scope.thumbsDown = function(question){
            $('#thumbsDown').addClass('disabled');
            $('#thumbsUp').removeClass('disabled');
            $http.post('/question/thumbsDown',{question:question}).then(function(res){
            });
        };
    });
})();