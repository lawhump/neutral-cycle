var myApp = angular.module("myApp", ["firebase"]);

myApp.controller('MyController', ['$scope', '$firebase',
    function($scope, $firebase) {
        //CREATE A FIREBASE REFERENCE
        var ref = new Firebase("https://neutral-cycle.firebaseio.com/");

        // GET MESSAGES AS AN ARRAY
        $scope.reservations = $firebase(ref).$asArray();

        //ADD MESSAGE METHOD
        $scope.submit = function(event) { 
//            var datetime = new Date(document.getElementById('pickup_date').innerHTML + " " + document.getElementById('pickup_time').innerHTML + " CST");
            console.log(datetime);

            //ADD TO FIREBASE
            $scope.reservations.$add({
//                date        : datetime.toString(),
                email       : $scope.email,
                first_name  : $scope.first_name,
                last_name   : $scope.last_name,
                phone       : $scope.phone,
                rented      : false
            });
        }
    }
]);

