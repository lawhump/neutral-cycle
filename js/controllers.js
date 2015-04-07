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
        
        var statuses = [
            'pending_pickup',
            'pending_return',
            'completed'
        ];
        
        $scope.pp = statuses[0];
        $scope.pr = statuses[1];
        $scope.com = statuses[2];
        
    }]);

ncControllers.controller('RentalCtrl', ['$scope', '$firebase',
    function($scope, $firebase) {
        $scope.bikes = [{ 
            quantity: 1,
            control: false,
            src: 'hybrid.png',
            label: 'Hybrid Bike'
        }, {
            quantity: 1,
            control: true,
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
             
        
        $scope.byHour = {
            hybrid: 8,
            tandem: 10,
            cargo: 10
        };
        $scope.byDay = {
            hybrid: 25,
            tandem: 35,
            cargo: 35
        };
        $scope.byWeek = {
            hybrid: 100,
            tandem: 140,
            cargo: 140
        };
        
        $scope.timeIncrement = $scope.byHour;
        $scope.timeCount = 1;
        
        $scope.submit = function() {
            var datetime = new Date($scope.pickup_date + " " + $scope.pickup_time + " CST");
            
            $scope.reservations.$add({
                date        : datetime,
                email       : $scope.email,
                first_name  : $scope.first_name,
                last_name   : $scope.last_name,
                phone       : $scope.phone || null,
                rented      : false,
                location    : $scope.location
            });
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
