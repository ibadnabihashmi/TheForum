angular.module('the-forum').controller('BodyCtrl', ['$rootScope','$scope', '$modal','$http',
    function ($rootScope,$scope, $modal,$http) {
        'use strict';
        $http.get('/user').then(function(res){
            $rootScope.user = res.data.user;
        });
    }
]);
