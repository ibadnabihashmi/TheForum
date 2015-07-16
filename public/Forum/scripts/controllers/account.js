angular.module('the-forum').controller('AccountCtrl', ['$rootScope','$scope', '$modal','$http',
  function ($rootScope,$scope, $modal,$http) {
    'use strict';
    $scope.user = $rootScope.user;

  }
]);