angular.module('the-forum').controller('TaggedController', function($scope, $http, $routeParams, postService, fetchService){
    $scope.load = true;
    fetchService.fetchTaggedQuestions().then(function(res){
        $scope.load = false;
        $scope.posts = res.data.q;
    });
});