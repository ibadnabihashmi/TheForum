angular.module('the-forum').factory('sessionService', function($http){
    return{
        getSessionInfo: function(){
            return $http.get('/user').then(function(res){
                console.log(res.data.user);
                return res.data.user;
            });
        }
    }
});
