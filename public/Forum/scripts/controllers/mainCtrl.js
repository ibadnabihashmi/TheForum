angular.module('the-forum').controller('mainCtrl', ['$scope', '$http',  function ($scope, $http) {
    $scope.test="This is a test";
    $http.get('/explore/getAllQues')
        .then(function(res){
            $scope.allQuestions = res.data.questions;
        });
}
]);