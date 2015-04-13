var ncControllers = angular.module('ncControllers', ['firebase']);
//CREATE A FIREBASE REFERENCE
var ref = new Firebase("https://neutral-cycle.firebaseio.com/");

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
        
        $('html,body').on('click', '.continue', function() {
            var $nextSection = $(this).closest('.rental_section').next();
            $('html,body').animate({scrollTop: $nextSection.offset().top }, 600);
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
