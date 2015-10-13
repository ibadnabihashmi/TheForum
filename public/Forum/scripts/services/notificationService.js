angular.module('the-forum').factory('notificationService', function($http){
    return{
        notify: function(data){
            return $http.post('/notify/comment',data).then(function(res){
                return res;
            });
        },
        askNotify: function(data){
            return $http.post('/notify/askNotify',data).then(function(res){
                return res;
            });
        },
        checkNotifications: function(){
            return $http.get('/notify/check').then(function(res){
                return res.data.newNotif;
            });
        },
        getNotifs: function(){
            return $http.get('/notify/getNotifs').then(function(res){
                return res;
            });
        }
    }
});