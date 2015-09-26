angular.module('the-forum').factory('updateService', function($http, $routeParams){
    return{
        updateSchool: function(data){
            return $http.post('/update/school',data).then(function(res){
                return res.data.user;
            });
        },
        updateWork: function(data){
            return $http.post('/update/work',data).then(function(res){
                return res.data.user;
            });
        },
        updateInfo: function(data){
            return $http.post('/update/info',data).then(function(res){
                return res.data.user;
            });
        },
        updatePass: function(data){
            return $http.post('/update/pass',data).then(function(res){
                return res.data.user;
            });
        }
    }
});