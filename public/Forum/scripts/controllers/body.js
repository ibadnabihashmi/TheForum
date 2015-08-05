angular.module('the-forum').controller('BodyCtrl', function ($scope,$http, sessionService) {
    sessionService.getSessionInfo().then(function (response) {
        $scope.user=response;
    });
});


