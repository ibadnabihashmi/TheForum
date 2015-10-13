angular.module('the-forum').directive('deleteDirective', function (deleteService, sessionService, $route, $location) {
    return{
        scope:{
            deleteType: "@", deleteId: '=', ownerId: '='
        },
        restrict: 'E',
        template: '<div ng-show="hasRight"><a ng-click="deleteHandler()" class="btn-floating btn-small btn-white waves-effect z-depth-0"><i class="fa fa-trash-o" style="color: grey"></i></a> <!--Change style!!--></div>',
        link: function (scope, elements, attrs) {
            sessionService.getSessionInfo().then(function(response){
                if(scope.ownerId==response._id) scope.hasRight=true;
                else scope.hasRight=false;
            });
            var type=scope.deleteType, id=scope.deleteId;
            scope.deleteQuestion=function(){
                deleteService.deleteQuestion(id);
                if($route.current.regexp=="/^\\/explore\\/questionPage\\/(?:([^\\/]+))$/")
                    $location.path('/explore');
                else $route.reload();
            };
            scope.hasRight=function(){
                return true;
            };
            scope.deleteHandler=function(){
                if(type==='deleteQuestion') {
                  scope.deleteQuestion();
                }
                if(type==='deleteComment') {
                    deleteService.deleteComment(id);
                    $route.reload();
                }
                if(type==='deletePoll') {
                //deleteQuestion($routeParams.pid);
                }
          };
        }
    }
});