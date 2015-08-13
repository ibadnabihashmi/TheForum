angular.module('the-forum').factory('sessionService', function($http, $routeParams){
    return{
        getSessionInfo: function(){
            return $http.get('/user').then(function(res){
                return res.data.user;
            });
        },
        getUserInfo: function(){
            return $http.get('/account/'+$routeParams.username+'/getUser').then(function(res){
                return res.data.userInfo;
            });
        },
        unfollowUser: function(userId){
            return $http.post('/account/unfollow?userId='+userId).then(function(res){
                return res.data;
            });
        },
        followUser: function(userId){
            return $http.post('/account/follow?userId='+userId).then(function(res){
                return res.data;
            });
        }
    }
});