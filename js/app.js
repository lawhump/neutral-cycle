var myApp = angular.module('myApp', [
  'ngRoute',
  'myAppControllers'
]);

myApp.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider.
        when('/reservations', {
            templateUrl: 'templates/mgmt-full.html',
            controller: 'MGMTFullCtrl'
        }).
        when('/reservations/:resId', {
            templateUrl: 'templates/res-detail.html',
            controller: 'MGMTSingleCtrl'
        }).
        otherwise({
            redirectTo: '/reservations'
        });
    }]);