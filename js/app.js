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
            controller: 'RentalCtrl',
            css: 'css/rental.css'
        })
        
        .when('/payment', {
            templateUrl: '/templates/payment.html',
            controller: 'PayCtrl',
            css: 'css/payment.css'
        })
        
        .when('/login', {
            templateUrl: '/templates/login.html',
            controller: 'LoginCtrl'
        })
        
        .when('/reservations', {
            templateUrl: '/templates/mgmt-full.html',
            controller: 'MGMTFullCtrl',
            css: 'css/mgmt.css'
        })
        
        .when('/reservations/:resId', {
            templateUrl: '/templates/res-detail.html',
            controller: 'MGMTSingleCtrl',
            css: 'css/mgmt.css'
        })
        
        .when('/confirmation', {
            templateUrl: '/templates/confirmation.html',
            controller: 'ConfirmationCtrl',
            css: 'css/confirm.css'
        })
        
        .otherwise({ 
            templateUrl: '/templates/404.html' 
        });
    }]);

myApp.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);