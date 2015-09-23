function userResolve(){
    return function(sessionService) {
        return sessionService.getSessionInfo().then(function (response) {
            return response;
        });
    }
}
function userInfoResolve(){
    return function(sessionService) {
        return sessionService.getUserInfo().then(function (response) {
            return response;
        });
    }
}
function getAllQuestions(){
    return function(fetchService) {
        return fetchService.getAllQuestions().then(function (response) {
            return response;
        });
    }
}
function getQuestion(){
    return function(fetchService) {
        return fetchService.fetchQuestion().then(function (response) {
            return response;
        });
    }
}
function getComments(){
    return function(fetchService) {
        return fetchService.fetchComments().then(function (response) {
            return response;
        });
    }
}


angular.module('the-forum').config(function ($routeProvider, $locationProvider) {
    'use strict';
    $routeProvider
        .when('/account/:username', {
            templateUrl: '/Forum/views/account/profile.html',
            controller: 'AccountCtrl',
            resolve: {
                userSession: userResolve(),
                userInfo: userInfoResolve()
            }
        })
        .when('/account/:username/settings_profile', {
            templateUrl: '/Forum/views/account/settings_profile.html',
            controller: 'AccountCtrl',
            resolve: {
                userSession: userResolve(),
                userInfo: userInfoResolve()
            }
        })
        .when('/account/:username/notification', {
            templateUrl: '/Forum/views/account/notification.html',
            controller: 'AccountCtrl',
            resolve: {
                userSession: userResolve(),
                userInfo: userInfoResolve()
            }
        })
        .when('/account/:username/activity', {
            templateUrl: '/Forum/views/account/activity.html',
            controller: 'AccountCtrl',
            resolve: {
                userSession: userResolve(),
                userInfo: userInfoResolve()
            }
        })
        .when('/account/:username/ask', {
            templateUrl: '/Forum/views/account/Ask.html',
            controller: 'AskCtrl',
            resolve: {
                userSession: userResolve(),
                userInfo: userInfoResolve()
            }
        })
        .when('/explore', {
            templateUrl: '/Forum/views/account/explore.html',
            controller: 'exploreCtrl',
            resolve: {
                userSession: userResolve(),
                allQuestions: getAllQuestions()
            }
        })
        .when('/explore/questionPage/:qid', {
            templateUrl: '/Forum/views/account/question.html',
            controller: 'QstnCtrl',
            resolve: {
                userSession: userResolve(),
                Question: getQuestion(),
                Comments: getComments()
            }
        })
        .when('/explore/pollPage/:pid', {
            templateUrl: '/Forum/views/account/polling.html',
            controller: 'PollController',
            resolve: {
                userSession: userResolve()
             }
        })
        .when('/poll', {
            templateUrl: '/Forum/views/account/poll.html',
            controller: 'PollController',
            resolve: {
                userSession: userResolve()
            }
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