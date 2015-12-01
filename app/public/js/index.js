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
    controller: 'WaresCtrl'
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
        $location.path('users/reg');
        console.log(data.msg);
      }

    }).error(function(data){
      console.log(data);

    })
  }
});
app.controller('LoginCtrl', function($rootScope, $scope, $location, $http){
  $scope.title = '登录';
  $scope.save = function(){
    $http({
      url: '/users/login',
      method: 'post',
      data: $scope.user
    }).success(function(data){
      if(data.code == 1){
        $rootScope.me = data.user;
        $location.path('/');
      }else {
        $location.path('/users/login');
        console.log('登录失败');
      }
    }).error(function(data){
      console.log(data);
    });
  };
});
app.controller('WaresCtrl', function($scope, $http){
  $scope.ware = {};
  $scope.wares = [];
  $http({
    url: '/wares/list',
    method: 'get'
  }).success(function(data){
    if(data.code == 1){
      $scope.wares = data.wares;
    }else {
      console.log(data.msg);
    }
  });
  $scope.save = function(){
    $http({
      url: '/wares/add',
      method: 'post',
      data: $scope.ware
    }).success(function(data){
      if(data.code == 1){
        $scope.wares.push(data.ware);
      }else {
        console.log(data.msg);
      }
    });
  };
  $scope.addCart = function(wareId){
    $http({
      url: '/wares/addCart/'+wareId,
      method: 'get'
    }).success(function(data){
      if(data.code == 1){
        console.log(data.cart);
      }else {
        console.log(data.msg);
      }
    });
  };
});
app.controller('CartsCtrl', function($scope, $http){
  $scope.carts = [];
  $http({
    url: '/carts/list',
    method: 'get'
  }).success(function(data){
    if(data.code == 1){
      $scope.carts = data.carts;
      console.log(data.carts);
    }else {
      console.log(data.msg);
    }
  });
  $scope.delete = function(cartId, index){
    $http({
      url: '/carts/delete/'+cartId,
      method: 'get'
    }).success(function(data){
      if(data.code == 1){
        $scope.carts.splice(index, 1);
      }else {
        console.log(data.msg);
      }
    });
  };
  $scope.total = function(){
    var total = 0;
    $scope.carts.forEach(function(cart){
      total += cart.num*cart.ware.price;
    });
    return total;
  };

});
