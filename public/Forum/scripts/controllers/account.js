angular.module('the-forum').controller('AccountCtrl', function ($scope, sessionService, fetchService) {
    sessionService.getSessionInfo().then(function(response) {
        $scope.user=response;
        setupProfileView();
    });
    fetchService.getNotifications().then(function (response) {
        $scope.notifications=response;
    });

    function forEach(array, callback) {
        for(var i=0;i<array.length;i++){
            if(callback(array[i]._id)) break;
        }
    }

    function setupProfileView() {
        sessionService.getUserInfo().then(function (response) {
            $scope.userInfo=response;

            if($scope.user.username!==$scope.userInfo.username){
                $scope.otherUser=true;
                $scope.follow="Follow";

                forEach(response.followers, function(item) {
                    if(item===$scope.user._id){
                        $scope.follow="Unfollow";
                        return true;
                    }
                });
            }
        });
    }

    $scope.onFollow=function(followFlag){
        if($scope.otherUser){
            if(followFlag=="Follow"){
                sessionService.followUser($scope.userInfo._id).then(function (response) {
                    setupProfileView($scope.userInfo);
                });
            }else{
                sessionService.unfollowUser($scope.userInfo._id).then(function (response) {
                    setupProfileView($scope.userInfo);
                });
            }
        }else{
            sessionService.unfollowUser(followFlag).then(function (response) {
                setupProfileView($scope.userInfo);
            });
        }
    };

    /*        fetchService.getActivity().then(function (response) {
     $scope.activity=response;
     });*/
});