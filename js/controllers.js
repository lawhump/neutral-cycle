var myAppControllers = angular.module('myAppControllers', ['firebase']);

myAppControllers.controller('MGMTFullCtrl', ['$scope', '$firebase',
    function($scope, $firebase) {
        //CREATE A FIREBASE REFERENCE
        var ref = new Firebase("https://neutral-cycle.firebaseio.com/");

        // GET MESSAGES AS AN ARRAY
        $scope.reservations = $firebase(ref).$asArray();
        console.log($scope.reservations);
    }]);

myAppControllers.controller('MGMTSingleCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.resID = $routeParams.resID;
    }]);