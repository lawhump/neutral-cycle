angular.module('ncFilters', []).filter('filter', function() {
    return function(reservations, location, query, status) {
        var filtered = [];
        
        function filLocation(location) {
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

        function filQuery(query) {
            for(var i=0; i<filtered.length; i++){
                var rv = filtered[i];
                var result;
                for(var key in rv) {
                    if(typeof rv[key] == 'string'){
                        result = (rv[key]).match(new RegExp(query, 'i'));
                    }

                    if (result){
                        break;
                    }
                }
                if (result == null){
                    filtered.splice(i, 1);
                    i--;
                }
            };
        }

        function filStatus(status) {
            for(var i=0; i<filtered.length; i++){
                if(filtered[i].status.localeCompare(status) != 0){
                    filtered.splice(i, 1);
                    i--;
                }
            };
        }
        
        // limit to location; build array, then take from it as necessary
        filLocation(location);
        // add to appropriate section
        filStatus(status);
        // remove values based on query
        if(query != null){
            filQuery(query);
        }
            
        return filtered;
    };
});