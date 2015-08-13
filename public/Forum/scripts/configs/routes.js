angular.module('the-forum').config(function ($routeProvider, $locationProvider) {
    'use strict';
    $routeProvider
        .when('/account/:username', {
            templateUrl: '/Forum/views/account/profile.html',
            controller: 'AccountCtrl'

        })
        .when('/account/:username/settings_profile', {
            templateUrl: '/Forum/views/account/settings_profile.html',
            controller: 'AccountCtrl'
        })
        .when('/account/:username/notification', {
            templateUrl: '/Forum/views/account/notification.html',
            controller: 'AccountCtrl'
        })
        .when('/account/:username/activity', {
            templateUrl: '/Forum/views/account/activity.html',
            controller: 'AccountCtrl'
        })
        .when('/account/:username/ask', {
            templateUrl: '/Forum/views/account/Ask.html',
            controller: 'AskCtrl'
        })
        .when('/explore', {
            templateUrl: '/Forum/views/account/explore.html',
            controller: 'QstnCtrl'
        })
        .when('/explore/questionPage/:qid', {
            templateUrl: '/Forum/views/account/question.html',
            controller: 'QstnCtrl'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});