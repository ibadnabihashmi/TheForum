angular.module('the-forum').config(function ($routeProvider, $locationProvider) {
  'use strict';

  $routeProvider
      .when('/account', {
          templateUrl: '/Forum/views/account/profile.html',
          controller: 'AccountCtrl'
      })
      .when('/account/ask', {
          templateUrl: '/Forum/views/account/Ask.html',
          controller: 'AskCtrl'
      });

      $locationProvider.html5Mode(true);
});