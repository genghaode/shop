var app = angular.module('appModule', ['ngRoute']);
app.run(function($rootScope, $location, $http){
  $http({
    url: '/users/validate',
    method: 'post'
  }).success(function(data){
    if(data.code == 1){
      $rootScope.me = data.user;
      $location.path('/');
    }else {
      $location.path('/users/login');
    }
  }).error(function(err){
    console.log(err);
  });

});
app.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'pages/home.html',
    controller: 'HomeCtrl'
  }).when('/users/reg', {
    templateUrl: 'pages/users/reg.html',
    controller: 'RegCtrl'
  }).when('/users/login', {
    templateUrl: 'pages/users/login.html',
    controller: 'LoginCtrl'
  }).when('/wares/admin/list', {
    templateUrl: 'pages/wares/admin/list.html',
    controller: 'WaresACtrl'
  }).when('/wares/list', {
    templateUrl: 'pages/wares/list.html',
    controller: 'WaresCtrl'
  }).when('/carts/list', {
    templateUrl: 'pages/carts/list.html',
    controller: 'CartsCtrl'
  }).otherwise({
    redirectTo: '/users/login'
  });
});
app.controller('NavBarCtrl', function($rootScope, $scope, $location, $http){
  $scope.isActive = function(path){
    return path == $location.path();
  };
  $scope.logout = function(){
    $http({
      url: 'users/logout',
      method: 'post'
    }).success(function(data){
      if(data.code == 1){
        $rootScope.me = null;
        $location.path('/users/login');
      }
    });
  };
});
app.controller('HomeCtrl', function($scope){
  $scope.title = '商城';
});
app.controller('RegCtrl', function($rootScope, $scope, $http, $location){
 $scope.title = '注册';
  $scope.save = function(){
    $http({
      url: '/users/reg',
      method: 'post',
      data: $scope.user
    }).success(function(data){
      if(data.code == 1){
        $rootScope.me = data.user;
        $location.path('/');
      }else {
        console.log(data.msg);
      }

    }).error(function(data){
      console.log(data);
      $location.path('users/reg');
    })
  }
});
app.controller('LoginCtrl', function(){

});
app.controller('WaresACtrl', function(){

});
app.controller('WaresCtrl', function(){

});
app.controller('CartsCtrl', function(){

});
