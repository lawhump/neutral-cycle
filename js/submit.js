$(document).ready(function() {
    //reference to the firebase location
    var myDataRef = new Firebase('https://neutral-cycle.firebaseio.com/');
    
    function submit(){
        var valid = $('#rental').valid();
        
        //validate form
        if (!valid) {
            console.log("Invalid Form");
            return;
        }
        
        //convert form into array
        var rental = $("#rental").serializeArray();
        var datetime = new Date(rental[4].value + " " + rental[5].value + " CST");

        //myDataRef.push({
        //    date        : datetime.toString(),
        //    email       : rental[2].value,
        //    first_name  : rental[0].value,
        //    last_name   : rental[1].value,
        //    phone       : rental[3].value
        //});
        
        myDataRef.setWithPriority({
            date        : datetime.toString(),
            email       : rental[2].value,
            first_name  : rental[0].value,
            last_name   : rental[1].value,
            phone       : rental[3].value
        }, Date.parse(datetime.toString()));
    }
    
    // Add a callback that is triggered for each chat message.
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
    
    $("#butts").on("click", submit);
});