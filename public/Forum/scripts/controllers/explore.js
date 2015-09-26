angular.module('the-forum').controller('exploreCtrl', function($scope, allQuestions, userSession, fetchService){
    $scope.allQuestions=allQuestions;
    $scope.user=userSession;
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

});