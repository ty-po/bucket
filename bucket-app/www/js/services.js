angular.module('starter.services', ['ionic'])

.factory('Test', function($http) {
  return {
    get: function(callback) {
      $http.get('https://node.ty-po.com/').success(callback);
    },
    secured: function(callback) {
      $http.get('https://node.ty-po.com/users').success(callback);
    }
  }


})

//Event

.factory('Bucket', function($http){
  return {
    get: function(callback) {
      $http.get('https://node.ty-po.com/pins').success(callback);
    },
    select: function(eventid, callback) {
      console.log(eventid);
      //$http.put('https://node.ty-po.com/me/list',{event_id: eventid}).success(callback);
    }
  }
})

//List

//Account
.factory('Account', function($http){
  return {
    get: function(callback) {
      $http.get('https://node.ty-po.com/me').success(callback);
    },
    remove: function(callback) {
      $http.delete('https://node.ty-po.com/users' + sessionStorage.id).success(callback);
    }
  }
})


/***
//$resource
.factory('Pin',function($resource) {
    return $resource('https://node.typo.com/pins');
  
})
**/
;

