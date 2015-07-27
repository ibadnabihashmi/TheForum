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
        })
        .when('/account/notification', {
            templateUrl: '/Forum/views/account/notification.html',
            controller: 'AccountCtrl'
        })
        .when('/account/activity', {
            templateUrl: '/Forum/views/account/activity.html',
            controller: 'AccountCtrl'
        })

        .when('/explore', {
            templateUrl: '/Forum/views/account/explore.html',
            controller: 'QstnCtrl'
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