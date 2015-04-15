var ncControllers = angular.module('ncControllers', ['firebase']);
//CREATE A FIREBASE REFERENCE
var ref = new Firebase("https://neutral-cycle.firebaseio.com/");

var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\-\ ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
//
//ncControllers.directive('phone', function() {
//    return {
//        restrice: 'A',
//        require: 'ngModel',
//        link: function(scope, element, attrs, ctrl) {
//            angular.element(element).bind('blur', function() {
//                var value = this.value;
//                if(PHONE_REGEXP.test(value)) {
//                    // Valid input
//                    console.log("valid phone number");
//                    $('.phone-error').css('display','none');  
//                } else {
//                    // Invalid input  
//                    console.log("invalid phone number");
//                    $('.phone-error').css('display','block');                 
//                }
//            });              
//        }            
//    }        
//});


ncControllers.controller('MGMTFullCtrl', ['$scope', '$firebase',
    function($scope, $firebase) {
        // GET MESSAGES AS AN ARRAY
        $scope.reservations = $firebase(ref).$asArray();
        
        $scope.locations = [
                { label: 'All', value: 'all' },
                { label: 'Neutral Cycle HQ', value: 'nchq' },
                { label: 'Flying Machine', value: 'flymach' },
                { label: 'The Pharmacy', value: 'pharm' }
            ];
        
        $scope.location = $scope.locations[1];
        
        $scope.status = 'pending_pickup';
        $scope.setStatus = function(status) {
            $scope.status = status;
        }
    }]);

ncControllers.controller('MGMTSingleCtrl', ['$scope', '$firebase', '$routeParams',
    function($scope, $firebase, $routeParams) {
        $scope.resId = $routeParams.resId;
        var resRef = new Firebase(ref + "/" + $routeParams.resId);
        $scope.userRes = $firebase(resRef).$asObject();
        
        $scope.update = function() {
            $scope.userRes.$save();
        };
    }]); 

ncControllers.controller('RentalCtrl', ['$scope', '$firebase',
    function($scope, $firebase, reservationMeta) {
        $scope.bikes = [{ 
            quantity: 1,
            control: false,
            src: 'hybrid.png',
            label: 'Hybrid Bike'
        }, {
            quantity: 1,
            control: false,
            src: 'tandem.png',
            label: 'Tandem Bike'
        }, {
            quantity: 1,
            control: false,
            src: 'cargo.png',
            label: 'Cargo Bike'
        }, {
            quantity: 1,
            control: false,
            src: 'trailer.png',
            label: 'Bike Trailer'
        }, {
            quantity: 1,
            control: false,
            src: 'car-rack.png',
            label: 'Car Rack'
        }];
        
        $scope.decrementBike = function(bike) {
            bike.quantity == 1 ? bike.control = false : bike.quantity -= 1;
        }
        
        $scope.incrementBike = function(bike) {
            bike.quantity += 1;
        }
        
        $scope.quantity = 0;
        $scope.updateQuantity = function() {
            $scope.quantity = $scope.bikes.reduce( 
                function(total, bike) { 
                    return bike.control ? total + bike.quantity : total;
                }, 0);
        }
        
        $scope.byHour = [8, 10, 10];
        $scope.byDay = [25, 35, 35];
        $scope.byWeek = [100, 140, 140];
        
        $scope.timeIncrement = $scope.byHour;
        $scope.timeCount = 1;
        
        $scope.selectedDate = null;
        
        $scope.checkPhone = function(phone) {
            var num = phone.target.value;
            if(PHONE_REGEXP.test(num)) {
                // Valid input
                console.log("valid phone number");
                $('.phone-error').css('display','none');  
            } else {
                // Invalid input  
                console.log("invalid phone number");
                $('.phone-error').css('display','block');
                console.log($('.phone-error'));
            }
        }
        
        $scope.submit = function() {
            var datetime = new Date($scope.pickup_date + " " + $scope.pickup_time + " CST");
            var res = {
                date        : datetime,
                email       : $scope.email,
                first_name  : $scope.first_name,
                last_name   : $scope.last_name,
                phone       : $scope.phone || null,
                rented      : false,
                location    : $scope.location
            };
            
            var meta = {};
            meta.res = res; meta.bikes = $scope.bikes;
            reservationMeta.setMeta(meta);

            $location.path('/payment');
        }
        
        $('.continue').on('click', function() {
            var $nextSection = $(this).closest('.rental_section').next();
            $('html,body').animate({scrollTop: $nextSection.offset().top }, 600);
        });
        
        $('.datepicker').datepicker({ 
            inline: true,
            showOtherMonths: true,
            minDate: 0,
            maxDate: 90,
            onSelect: function(dateText) {
                $scope.selectedDate = new Date(dateText);
                $scope.$apply();
            }
        });
    }]);

ncControllers.controller('PayCtrl', ['$scope', '$http', '$firebase',
    function($scope, $http, $firebase, reservationMeta) {
//        console.log(reservationMeta.getMeta());
        // Stripe Response Handler
        $scope.stripeCallback = function (code, result) {
			if (result.error) {
				window.alert('it failed! error: ' + result.error.message);
			} 
            else {
				console.log('success! token: ' + result.id);
                
                console.log(result);

                $http.post('http://localhost:3000/charge', result).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(data);
            
//                    $scope.reservations.$add({
//                        date        : datetime,
//                        email       : $scope.email,
//                        first_name  : $scope.first_name,
//                        last_name   : $scope.last_name,
//                        phone       : $scope.phone || null,
//                        rented      : false,
//                        location    : $scope.location
//                    });
                }).
                 error(function(data, status, headers, config) {
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                 });

			 }
		};
        
    }]);
