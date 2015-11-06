angular.module('the-forum').controller('NotifCtrl', function ($scope,$rootScope,$http, sessionService, notificationService) {
    notificationService.getNotifs().then(function(res){
        $scope.notifications = res.data.notifications;
        $rootScope.user = res.data.user;
    });
});