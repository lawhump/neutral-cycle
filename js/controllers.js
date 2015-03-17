var ncControllers = angular.module('ncControllers', ['firebase']);
//CREATE A FIREBASE REFERENCE
var ref = new Firebase("https://neutral-cycle.firebaseio.com/");

ncControllers.controller('MGMTFullCtrl', ['$scope', '$firebase',
    function($scope, $firebase) {

        // GET MESSAGES AS AN ARRAY
        $scope.reservations = $firebase(ref).$asArray();
    }]);

ncControllers.controller('RentalCtrl', ['$scope', '$firebase',
    function($scope, $firebase) {

        $scope.reservations = $firebase(ref).$asArray();
        var baseRef = $firebase(ref);
        
        $scope.byHour = {
            'hybrid': 8,
            'tandem': 10,
            'cargo': 10
        };
        $scope.byDay = {
            'hybrid': 25,
            'tandem': 35,
            'cargo': 35
        };
        $scope.byWeek = {
            'hybrid': 100,
            'tandem': 140,
            'cargo': 140
        };
        
        $scope.submit = function() {
            var datetime = new Date($scope.pickup_date + " " + $scope.pickup_time + " CST");
            
            $scope.reservations.$add({
                date        : datetime.toString(),
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
