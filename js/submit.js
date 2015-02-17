$(document).ready(function() {
    //reference to the firebase location
    var myDataRef = new Firebase('https://neutral-cycle.firebaseio.com/');
    
    function submit(){
        //convert form into array
        var rental = $("#rental").serializeArray();

        myDataRef.push({
            date: rental[4].value,
            email : rental[2].value,
            first_name: rental[0].value,
            last_name: rental[1].value,
            phone: rental[3].value
        });
    }
            
    $('#butts').on('click', submit);   
});