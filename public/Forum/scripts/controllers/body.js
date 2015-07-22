angular.module('the-forum').controller('BodyCtrl', function ($scope, $modal,$http, sessionService) {
    sessionService.getSessionInfo().then(function (response) {
        $scope.user=response;
    });
});


