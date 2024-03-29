angular.module('the-forum').controller('AccountCtrl', function ($scope,$http, sessionService, fetchService,notificationService, userSession, userInfo) {
    //further Refactoring:
    //otherUser has to be predefined in the route resolve
    //limitation of returned resources on every fetch
    //form a directive for follow crap.
    //merge userInfo & userSession
    $scope.user=userSession;
    $scope.userInfo = userInfo;
    setupProfileView();

    $scope.light = {
        header : '',
        length : ''
    };
    var fetchUserPosts = function(){
        fetchService.fetchUserPosts({ userId:$scope.userInfo._id }).then(function(res){
                $scope.userPosts = res.data.posts;
        });
    };
    var fetchAskedPosts = function(){
        fetchService.fetchAskedPosts({ userId:$scope.userInfo._id }).then(function(res){
            $scope.asked = res.data.posts;
        });
    };
    function forEach(array, callback) {
        for(var i=0;i<array.length;i++){
            if(callback(array[i]._id)) break;
        }
    }
    function setupProfileView() {
        sessionService.getUserInfo().then(function (response) {
            $scope.userInfo=response;
            if($scope.user.username!==$scope.userInfo.username){
                $scope.otherUser=true;
                $scope.follow="Follow";
                forEach(response.followers, function(item) {
                    if(item===$scope.user._id){
                        $scope.follow="Unfollow";
                        return true;
                    }
                });
            }
        });
    }
    $scope.onFollow=function(followFlag){
        if($scope.otherUser){
            if(followFlag=="Follow"){
                sessionService.followUser($scope.userInfo._id).then(function (response) {
                    setupProfileView();
                    notificationService.followNotif({otherUser : $scope.userInfo}).then(function(res){
                        return;
                    });
                });
            }else{
                sessionService.unfollowUser($scope.userInfo._id).then(function (response) {
                    setupProfileView();
                });
            }
        }else{
            sessionService.unfollowUser(followFlag).then(function (response) {
                setupProfileView();
            });
        }
    };
    $scope.followPlease = function(id){
        sessionService.followUser(id).then(function (response) {
            setupProfileView();
        });
    };
    $scope.unFollowPlease = function(id){
        sessionService.unfollowUser(id).then(function (response) {
            sessionService.getSessionInfo().then(function(response) {
                $scope.user=response;
                setupProfileView();
            });
        });
    };
    $scope.imFollowing = function(){
        $scope.showFollow_err_ing=true;
        $scope.light.header = '';
        $scope.light.length = '';
        $scope.light.header = 'Following';
        $scope.light.length = $scope.userInfo.following.length;
    };
    $scope.myFollowers = function(){
        $scope.showFollow_err_ing=false;
        $scope.light.header = '';
        $scope.light.length = '';
        $scope.light.header = 'Followers';
        $scope.light.length = $scope.userInfo.followers.length
    };
    $scope.askMe = function(){
        var tags = [];
        var yolo ;
        if($scope.question.match(/(^#|[^&]#)([a-z0-9]+)/gi) != null){
            $scope.question.match(/(^#|[^&]#)([a-z0-9]+)/gi).forEach(function(i){
                yolo = i.trim();
                tags.push(yolo.slice(1, yolo.length));
            });
        }else{
            tags = [];
        }
        var question = {
            text : $scope.question,
            tags : tags.join(),
            to : []
        };
        question.to.push($scope.userInfo._id);
        $http.post('/account/:username/ask',question)
            .then(function(res){
                notificationService.askNotify({question:res.data.question}).then(function(res){
                    console.log(res);
                });
            });
    };
    fetchUserPosts();
    fetchAskedPosts();
});