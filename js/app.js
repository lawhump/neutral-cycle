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
        $locationProvider.html5Mode(true);
        $routeProvider
        .when('/', {
            templateUrl: '/templates/rental.html',
            controller: 'RentalCtrl'
        })
        
        .when('/payment', {
            templateUrl: '/templates/payment.html',
            controller: 'PayCtrl'
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