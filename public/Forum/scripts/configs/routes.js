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
        })
        .when('/explore/pollPage/:pid', {
            templateUrl: '/Forum/views/account/polling.html',
            controller: 'PollController'
        })
        .when('/poll', {
            templateUrl: '/Forum/views/account/poll.html',
            controller: 'PollController'
        })
        .when('/user/profile', {
            templateUrl: '/Forum/views/account/profileCard.html'
        })
        .when('/tags/showTags/:tag', {
            templateUrl: '/Forum/views/account/taggedQues.html',
            controller: 'TaggedController'
        })
        .when('/logout',{
            template: '',
            controller: function() {
                location.reload('/logout');
            }
        })
        .when('/login',{
            template: '',
            controller: function() {
                location.reload('/login');
            }
        })
        .when('/signup',{
            template: '',
            controller: function() {
                location.reload('/signup');
            }
        })
        .when('/',{
            template: '',
            controller: function() {
                location.reload('/');
            }
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});