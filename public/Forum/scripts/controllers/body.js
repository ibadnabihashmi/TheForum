angular.module('the-forum').controller('BodyCtrl', function ($scope, $rootScope,$http, sessionService, notificationService) {

    sessionService.getSessionInfo().then(function (response) {
        $rootScope.user=response;
        console.log($rootScope.user);
    });

});


