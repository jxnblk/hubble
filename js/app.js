'use strict';

var hubble = angular.module('hubble', ['ngRoute', 'ngTouch']);

hubble.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.when('/', {templateUrl: 'views/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/stars', {templateUrl: 'views/stars.html', controller: 'StarsCtrl'});
  $routeProvider.when('/:user', {templateUrl: 'views/user.html', controller: 'UserCtrl'});
  $routeProvider.when('/:user/following', {templateUrl: 'views/following.html', controller: 'FollowingCtrl'});
  $routeProvider.when('/:user/:repo', {templateUrl: 'views/repo.html', controller: 'RepoCtrl'});
  
  $routeProvider.otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);
}]);