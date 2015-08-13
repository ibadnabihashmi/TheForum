angular.module('the-forum').directive('followDirective', function (sessionService) {
    return{
        scope:{
            followFlag: "@"
        },
        link: function (scope, elements, attrs) {
            console.log(scope.followFlag);
        }
    }
});