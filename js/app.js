var myApp = angular.module('nc', [
  'ngRoute',
  'ncControllers'
]);

myApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
        .when('/', {
            templateUrl: '/templates/rental.html',
            controller: 'RentalCtrl'
        })
        
        .when('/reservations', {
            templateUrl: '/templates/mgmt-full.html',
            controller: 'MGMTFullCtrl'
        })
        
        .when('/reservations/:resId', {
            templateUrl: '/templates/res-detail.html',
            controller: 'MGMTSingleCtrl'
        })
        
//        .otherwise({ redirectTo: '/' });
    }]);