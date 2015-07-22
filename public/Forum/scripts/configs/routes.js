angular.module('the-forum').config(function ($routeProvider, $locationProvider) {
    'use strict';

    $routeProvider
        .when('/explore', {
            templateUrl: '/Forum/views/account/explore.html',
            controller: 'QstnCtrl'
        })
        .when('/account', {
            templateUrl: '/Forum/views/account/profile.html',
            controller: 'AccountCtrl'
        })
        .when('/account/ask', {
            templateUrl: '/Forum/views/account/Ask.html',
            controller: 'AskCtrl'
        })
        .when('/explore/questionPage', {
            templateUrl: '/Forum/views/account/question.html',
            controller: 'QstnCtrl'
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});