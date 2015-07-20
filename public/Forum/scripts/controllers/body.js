angular.module('the-forum').controller('BodyCtrl', function ($rootScope,$scope, $modal,$http, sessionService) {
    sessionService.getSessionInfo().then(function (response) {
        $scope.user=response;
    });

});
angular.module('the-forum').factory('sessionService', function($http){
    return{
        getSessionInfo: function(){
            return $http.get('/user').then(function(res){
                console.log(res.data.user);
                return res.data.user;
            });
        }
    }

});