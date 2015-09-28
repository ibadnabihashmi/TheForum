angular.module('the-forum').controller('UserprefsController', function ($scope,$http, sessionService, fetchService,updateService) {
    $scope.years = [];
    $scope.pass = {newPass:'',confPass:''};
    sessionService.getSessionInfo().then(function(res){
        $scope.user = res;
    });
    var initializeYears = function(){
        for(var i=1950;i<2025;i++){
            $scope.years.push(i);
        }
    };
    $scope.addSchool = function(){
        updateService.updateSchool({
            school:$scope.school
        }).then(function(res){
            $scope.school = {
                name:'',
                degree:'',
                start:'',
                end:''
            };
        });

    };
    $scope.addWork = function(){
        updateService.updateWork({
            work:$scope.work
        }).then(function(res){
            $scope.work = {
                name:'',
                position:'',
                start:'',
                end:''
            };

        });
    };
    $scope.updatePass = function(){
        if($scope.pass.confPass != $scope.pass.newPass){
            alert("passwords didn't match!!");
        }else{
            updateService.updatePass({
                pass:$scope.pass
            }).then(function(res){
            });
        }
    };
    $scope.updateInfo = function(){
        updateService.updateInfo({
            info:$scope.user
        }).then(function(res){
        });
    };
    $scope.toggleAskButton = function(){
        $http.put('/update/edb',{
            toggle:$scope.user.prefs.ask
        }).then(function(res){
            console.log(res);
        });
    };
    $scope.school = {
        name:'',
        degree:'',
        start:'',
        end:''
    };
    $scope.work = {
        name:'',
        position:'',
        start:'',
        end:''
    };
    initializeYears();
});