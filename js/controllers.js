var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\-\ ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
var ncControllers = angular.module('ncControllers', ['firebase']);
//CREATE A FIREBASE REFERENCE
var ref = new Firebase("https://neutral-cycle.firebaseio.com/");

ncControllers.service('Reservation', function() {
    var res = undefined;
    var price = 0;
        
    var addRes = function(rv) {
        res = rv;
    }

    var getRes = function(){
        return res;
    }

    var addPrice = function(p) {
        price = p;
    }

    var getPrice = function(){
        return price;
    }
    
    return {
        addRes: addRes,
        getRes: getRes,
        addPrice: addPrice,
        getPrice: getPrice
    };

});

var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\-\ ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

ncControllers.controller('MGMTFullCtrl', ['$scope', '$firebase', '$location',
    function($scope, $firebase, $location) {
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

ncControllers.controller('RentalCtrl', ['$scope', '$firebase', '$location', 'Reservation',
    function($scope, $firebase, $location, Reservation) {
        $scope.Reservation = Reservation;
        
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
        $scope.price = 0;
        $scope.updateQuantity = function() {
            $scope.quantity = $scope.bikes.reduce( 
                function(total, bike) { 
                    return bike.control ? total + bike.quantity : total;
                }, 0);
            $scope.price = $scope.bikes.reduce(
                function(total, bike, idx) {
                    var cost = bike.quantity * $scope.timeIncrement[idx] * $scope.timeCount;
                    return bike.control ? cost + total: total;
                }, 0);
        }
        
        $scope.byHour = [8, 10, 10, -1, -1];
        $scope.byDay = [25, 35, 35, 15, 15];
        $scope.byWeek = [100, 140, 140, -1, -1];
        
        $scope.timeIncrement = $scope.byDay;
        $scope.timeCount = 1;
        
        $scope.selectedDate = null;
        
        $scope.submit = function() {
            var res = {
//                date        : datetime,
                email       : $scope.email,
                first_name  : $scope.first_name,
                last_name   : $scope.last_name,
                phone       : $scope.phone || null,
                rented      : false,
                location    : $scope.location
            };
            Reservation.addRes(res);
            // give me price so i can do this
            //Reservation.addPrice(price);

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

ncControllers.controller('PayCtrl', ['$scope', '$http', '$firebase', 'Reservation',
    function($scope, $http, $firebase, Reservation) {
        
        $scope.res = Reservation.getRes();
        // need price so this works
        // var price = Reservation.getPrice();
        var price = 3000;
        
        console.log($scope.res);
        
        // Stripe Response Handler
        $scope.stripeCallback = function (code, result) {
			if (result.error) {
				window.alert('it failed! error: ' + result.error.message);
			} 
            else {
				console.log('success! token: ' + result.id);                
                console.log(result);
                
                var request = 'http://localhost:3000/charge?p=' + price;

                $http.post(request, result).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(data);
                    
                    // Payment successful; push to DB
                    // $scope.reservations.$add($scope.res);
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    
                });

			 }
		};
        
    }]);
