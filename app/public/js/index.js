var app = angular.module('appModule', ['ngRoute']);
app.run(function($rootScope, $location, $http){
  //$http({
  //  url: '/users/validate',
  //  method: 'post'
  //}).success(function(data){
  //  if(data.code == 1){
  //    $rootScope.me = user;
  //    $location.path('/');
  //  }else {
  //    $location.path('/users/login');
  //  }
  //}).error(function(err){
  //  console.log(err);
  //});
  $rootScope.me = 'geng';
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
app.controller('NavBarCtrl', function($scope, $location){

});
app.controller('HomeCtrl', function(){

});
app.controller('RegCtrl', function(){

});
app.controller('LoginCtrl', function(){

});
app.controller('WaresACtrl', function(){

});
app.controller('WaresCtrl', function(){

});
app.controller('CartsCtrl', function(){

});