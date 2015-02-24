$(document).ready(function() {
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
        
        var logelement = $("<li>");
        
        $(logelement).append("<p>first name: " + first_name + " </p>");
        $(logelement).append("<p>last name: " + last_name + " </p>");
        $(logelement).append("<p>date: " + date + " </p>");
        $(logelement).append("<p>phone: " + phone + " </p>");
        $(logelement).append("<p>email: " + email + " </p>");
        
        // Store a reference to the table row so we can get it again later.
        htmlForPath[reservationSnapshot.key()] = logelement;
        
        // Insert the new score in the appropriate place in the table.
        if (prevReservationName === null) {
            $(".log").append(logelement);
        }
        else {
            var lowerScoreRow = htmlForPath[prevReservationName];
            lowerScoreRow.before(logelement);
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
    
    
    
    
    
    
    
    
    
    function generateKey(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
    function submit(){
        var key = generateKey();
        var valid = $('#rental').valid();
        
        //validate form
        if (!valid) {
            console.log("Invalid Form");
            return;
        }
        
        //convert form into array
        var rental = $("#rental").serializeArray();
        var datetime = new Date(rental[4].value + " " + rental[5].value + " CST");

        var resRef = myDataRef.child(key);
        resRef.setWithPriority({ 
            date        : datetime.toString(),
            email       : rental[2].value,
            first_name  : rental[0].value,
            last_name   : rental[1].value,
            phone       : rental[3].value
        }, Date.parse(datetime.toString()));
    }
    
    // Add a callback that is triggered for each chat message.
    /*
    myDataRef.limitToLast(10).on('child_added', function (snapshot) {
        //GET DATA
        var data = snapshot.val();
        
        var date        = data.date;      
        var email       = data.email;     
        var first_name  = data.first_name;
        var last_name   = data.last_name; 
        var phone       = data.phone;     
            
        //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        var logelement = $("<li>");
        
        $(logelement).append("<p>first name: " + first_name + " </p>");
        $(logelement).append("<p>last name: " + last_name + " </p>");
        $(logelement).append("<p>date: " + date + " </p>");
        $(logelement).append("<p>phone: " + phone + " </p>");
        $(logelement).append("<p>email: " + email + " </p>");
        
        $(".log").prepend(logelement);
    });
    */
    
    $("#butts").on("click", submit);
});