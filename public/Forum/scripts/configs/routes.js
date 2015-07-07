angular.module('the-forum').config(function ($routeProvider, $locationProvider) {
  'use strict';

  $routeProvider
      .when('/login', {
          templateUrl: '/Forum/views/account/login.html',
          controller: 'LoginCtrl'
      })
      .when('/signup', {
          templateUrl: '/Forum/views/account/signup.html',
          controller: 'SignupCtrl'
      })
      .when('/auth/facebook', {
          controller: 'OauthCtrl'
      });

      $locationProvider.html5Mode(true);
});