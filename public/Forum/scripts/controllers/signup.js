angular.module('the-forum').controller('SignupCtrl', ['$scope','$http',
    function ($scope,$http) {
        var user = {
            email:$scope.email,
            password:$scope.password,
            confirmPassword:$scope.confirmPassword
        };
        $scope.signup = function(){
            console.log(user);
            $http.post('/signup',user).then(function(res){
                console.log(res);
            });
        };
    }
]);