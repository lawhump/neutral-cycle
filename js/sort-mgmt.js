$( document ).ready(function() {
    //reference to the firebase location
    var myDataRef = new Firebase('https://neutral-cycle.firebaseio.com/');
    
    // Keep a mapping of firebase locations to HTML elements, so we can
    // move / remove elements as necessary.
    var htmlForPath = {};
     
    // Helper function that takes a new score snapshot and adds an appropriate row to our leaderboard table.
    function handleReservationAdded(reservationSnapshot, prevReservationName) {
        
        var data = reservationSnapshot.val();
        
        var date        = data.date;      
        var email       = data.email;     
        var first_name  = data.first_name;
        var last_name   = data.last_name; 
        var phone       = data.phone;  
        
        // CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        
        var logelement = $("<tr>");
        
        $(logelement).append("<td>" + first_name + " </td>");
        $(logelement).append("<td>" + last_name + " </td>");
        $(logelement).append("<td>" + date + " </td>");
        $(logelement).append("<td>" + phone + " </td>");
        $(logelement).append("<td>" + email + " </td>");
        
        // Store a reference to the table row so we can get it again later.
        htmlForPath[reservationSnapshot.key()] = logelement;
        
        // Insert the new score in the appropriate place in the table.
        if (prevReservationName === null) {
            $(".log").append(logelement);
        }
        else {
            var lowerScoreRow = htmlForPath[prevReservationName];
            lowerScoreRow.after(logelement);
        }
    }
    // Helper function to handle a reservation object being removed; just removes
    // the corresponding table row.
    function handleReservationRemoved(reservationSnapshot) {
        var removedReservationRow = htmlForPath[reservationSnapshot.key()];
        //logelement.remove();
        delete htmlForPath[reservationSnapshot.key()];
    }
    
    var reservationListView = myDataRef.limitToLast(10);
    
    // Add a callback to handle when a new reservation is added.
    reservationListView.on('child_added', function (newReservationSnapshot, prevReservationName) {
        handleReservationAdded(newReservationSnapshot, prevReservationName);
    });
  
    // Add a callback to handle when a reservation is removed
    reservationListView.on('child_removed', function (oldReservationSnapshot) {
      handleReservationRemoved(oldReservationSnapshot);
    });
    
      // Add a callback to handle when a reservation changes or moves positions.
      var changedCallback = function (reservationSnapshot, prevReservationName) {
        handleReservationRemoved(reservationSnapshot);
        handleReservationAdded(reservationSnapshot, prevReservationName);
      };
      reservationListView.on('child_moved', changedCallback);
      reservationListView.on('child_changed', changedCallback);
});