angular.module('ncFilters', [])

.filter('mgmt', function() {
    return function(reservations, location, query, status) {
        var filtered = [];
        
        var filLocation = function (location) {
            if(location == 'all') { 
                angular.forEach(reservations, function(value, key) {
                    for (var property in value) {
                        if (value.hasOwnProperty(property)) {
                            filtered.push(value); break;
                        }
                    }

                });
            }

            else{
                angular.forEach(reservations, function(value, key) {
                    for (var property in value) {
                        if (value.hasOwnProperty(property)) {
                            if(value['location'] == location){ filtered.push(value); break;}
                        }
                    }

                });
            }
        }

        var filQuery = function (query) {
            for (var i=0; i<filtered.length; i++){
                var rv = filtered[i];
                var result;
                for(var key in rv) {
                    if(typeof rv[key] == 'string'){
                        result = (rv[key]).match(new RegExp(query, 'i'));
                    }

                    if (result){
                        continue;
                    }
                    else {
                        filtered.splice(i, 1);
                        i--;
                        continue;
                    }
                }
            }
        }

        var filStatus = function (status) {
            for(var i=0; i<filtered.length; i++){
                if(filtered[i].status.localeCompare(status) != 0){
                    filtered.splice(i, 1);
                    i--;
                }
            }
        }
        
        // limit to location; build array, then take from it as necessary
        filLocation(location);
        // add to appropriate section
        filStatus(status);
        // remove values based on query
        if(query != null){
            filQuery(query);
        }
        else {
                
        }
            
        return filtered;
    };
})

.filter('control', function() {
    return function(bikes) {
        var out = [];

        function filControl(bikes) {
            angular.forEach(bikes, function(value, key){
                for (var property in value) {
                        if (value.hasOwnProperty(property)) {
                            if(value['control'] === true){ out.push(value); break;}
                        }
                    }
            });
        }
        
        // limit to location; build array, then take from it as necessary
        filControl(bikes);
            
        return out;
    };
});