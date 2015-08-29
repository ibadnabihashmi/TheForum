angular.module('the-forum').controller('SearchController', function ($scope,$http, sessionService, fetchService) {
    $scope.showResults = false;
    $scope.matchedUsers = [];
    $scope.userSearch = function(event){
        $scope.showResults = true;
        if($scope.query == '' || $scope.query == undefined){
            $scope.showResults = false;
        }
        fetchService.matchingUser({match:$scope.query}).then(function(res){
            $scope.matchedUsers = res.data.users;
        });
    };
});