angular.module('the-forum').controller('AccountCtrl', function ($scope, sessionService, fetchService) {
    sessionService.getSessionInfo().then(function(response) {
        $scope.user=response;
    });
    fetchService.getNotifications().then(function (response) {
        $scope.notifications=response;
    });
    /*        fetchService.getActivity().then(function (response) {
     $scope.activity=response;
     });*/
});