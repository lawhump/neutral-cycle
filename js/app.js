var myApp = angular.module('nc', [
    'ngRoute',
    'ncControllers',
    'ncFilters',
    'angularPayments'
]);

myApp.config(function() {
		window.Stripe.setPublishableKey('pk_test_uRt8KmhZbeKjvbA9bt1VmWJR');
	});
/*
myApp.factory('Reservation', function() {
        // Define the Reservation function
        // TODO give it parameters
        var Reservation = function(){
            // Define the initialize function
            this.initialize = function () {
                // Declare local vars here
                    var res : {
                            date        : null,
                            email       : null,
                            first_name  : 'mia',
                            last_name   : 'wallace',
                            phone       : null,
                            rented      : false,
                            location    : 'nchq'
                        }; 
            }
    
            // Call the initialize function for every new instance
            this.initialize();
        }
    
        // Return a reference to the function
        return (Reservation);
        
    });
*/

myApp.factory('Reservation', function() {
    
    
        return {
            init: function() {
                this.res = {
                    date        : null,
                    email       : 'satan.zmith@hell.gov',
                    first_name  : 'satan',
                    last_name   : 'zmith',
                    phone       : '6664206969',
                    rented      : false,
                    location    : 'nchq'
                };
            },
            
            res : {
                date        : '',
                email       : '',
                first_name  : '',
                last_name   : '',
                phone       : '',
                rented      : false,
                location    : 'nchq'
            }
        }
    });

/*
myApp.factory('Price', function() {
        // Define the DribbblePlayer function
        var PriceBreakdown = function(){
            // Define the initialize function
            this.initialize = function () {
                // Declare local vars here
            }
    
            // Call the initialize function for every new instance
            this.initialize();
        }
    
        // Return a reference to the function
        return (PriceBreakdown);
    });
*/

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