var myApp = angular.module("myApp", ["firebase"]);

myApp.controller('MyController', ['$scope', '$firebase',
    function($scope, $firebase) {
        //CREATE A FIREBASE REFERENCE
        var ref = new Firebase("https://neutral-cycle.firebaseio.com/");

        // GET MESSAGES AS AN ARRAY
        $scope.reservations = $firebase(ref).$asArray();
        console.log($scope.reservations);
    }
]);
