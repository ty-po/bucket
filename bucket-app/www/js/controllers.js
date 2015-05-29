angular.module('starter.controllers', ['ionic'])

.controller('LoginCtrl', function($scope, $state, $http, $window) {
    ionic.Platform.ready(function() {
      //StatusBar.hide();
    });
    $scope.doLogin = function(user) {
      console.log('Sign-In', user);
      $state.go('tab.bucket');
    };

    $scope.fbLogin = function() {
      $state.go('loading');
      openFB.login(
        function(response) {
          if (response.status === 'connected') {
            console.log('Facebook login succeeded');
            $http
              .post('https://node.ty-po.com/users', {fb_auth: sessionStorage.fbtoken, loc: '1,1'})
              .success(function(data, status, headers, config) {
                console.log('Bucket api works');
                console.log(data.message);
                if(data.message == 'Signed In') {
                  $window.sessionStorage.id = data.id;
                  $window.sessionStorage.auth = data.auth;
                  $state.go('tab.bucket');
                }
                else {
                  alert(data.message);
                }
              })
              .error(function() {
                delete $window.sessionStorage.fbtoken;
                alert('Bucket API Error');
              });
          }
          else {
            alert('Facebook login failed');
          }
        },
        {scope: 'email,user_friends,user_birthday,user_location,user_photos'});
    }
})

.controller('LoadingCtrl', function($scope) {
})

.controller('EventsCtrl', function($scope, Test) {
    Test.get(function(data){$scope.api = data});
    Test.secured(function(data){$scope.secure = data});
})

.controller('BucketCtrl', function($scope, Bucket) {
  Bucket.get(function(data){$scope.bucket = data});
})


.controller('ListCtrl', function($scope) {
})

.controller('AccountCtrl', function($scope, $state, $window, Account) {
    openFB.api({
        path: '/me',
//        params: {fields: 'id,birthday,gender,name,email,picture.type(large),location'},
        params: {fields: 'id,birthday,gender,name,email,location'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
            });
        },
        error: function(error) {
            alert('Facebook error: ' + error.error_description);
        }
    });

    $scope.doLogout = function() {
      openFB.logout();
      delete $window.sessionStorage.auth;
      $state.go('login');
    }
    
    Account.get(function(data){$scope.account = data});
});
