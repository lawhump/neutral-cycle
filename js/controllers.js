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

        // GET MESSAGES AS AN ARRAY
        $scope.reservations = $firebase(ref).$asArray();
    }]);

ncControllers.controller('MGMTSingleCtrl', ['$scope', '$firebase', '$routeParams',
    function($scope, $firebase, $routeParams) {
        $scope.resId = $routeParams.resId;
//        var resRef = ref + $routeParams.resId;
//        $scope.userRes = $firebase(resRef).$asObject();
        
        //$scope.first_name = userRef.first_name;
        //$scope.last_name = userRef.last_name;
        //$scope.email = userRef.email;
        //$scope.phone = userRef.phone;
        //$scope.date = userRef.date;
        
        var resRef = new Firebase(ref + "/" + $routeParams.resId);
//        console.log(resRef);
        $scope.userRes = $firebase(resRef).$asObject();
        
        //$scope.first_name = userRef.first_name;
        //$scope.last_name = userRef.last_name;
        //$scope.email = userRef.email;
        //$scope.phone = userRef.phone;
        //$scope.date = userRef.date;
    }]); 
