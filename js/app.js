var myApp = angular.module('nc', [
    'ngRoute',
    'ncControllers',
    'ncFilters',
    'angularPayments'
]);

myApp.config(function() {
		window.Stripe.setPublishableKey('pk_test_uRt8KmhZbeKjvbA9bt1VmWJR');
	});

myApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/templates/rental.html',
            controller: 'RentalCtrl'
        })
        
        .when('/payment', {
            templateUrl: '/templates/payment.html',
            controller: 'PayCtrl'
        })
        
        .when('/login', {
            templateUrl: '/templates/login.html',
            controller: 'LoginCtrl'
        })
        
        .when('/reservations', {
            templateUrl: '/templates/mgmt-full.html',
            controller: 'MGMTFullCtrl'
        })
        
        .when('/reservations/:resId', {
            templateUrl: '/templates/res-detail.html',
            controller: 'MGMTSingleCtrl'
        })
        
        .otherwise({ 
            templateUrl: '/templates/404.html' 
        });
    }]);