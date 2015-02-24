$( document ).ready(function() {
    var data = [];
    
    function reservation(date){
        this.name = "Lawrence";
        this.date = date;
    }
    
    function parseDate(input) {
        var parts = input.match(/(\d+)/g);
        var int_parts = parts.map(function(item){return parseInt(item)});
        return new Date(int_parts[0], int_parts[1], int_parts[2], int_parts[3], int_parts[4], int_parts[5]);
    }
    
    /*
    function sort_and_update(dates){
        dates.sort(function(a, b) {
            return a - b;
        });
        console.log(dates);
        console.log("////////////////////////////");
        var logelement = $("<li>");
        $.each(dates, function(val){
            $(logelement).append("<p>: " + this + " </p>");
            console.log(this);
        });
        $("#log").prepend(logelement);
    }
    */
    function sort_and_update(reservations){
        reservations.sort(function(a, b) {
            return Date.parse(a.date) - Date.parse(b.date);
        });
        console.log(reservations);
        console.log("////////////////////////////");
        var logelement = $("<li>");
        $.each(reservations, function(val){
            $(logelement).append("<p>name: " + this.name + " date: " + this.date + " p>");
            console.log(this);
        });
        $("#log").prepend(logelement);
    }
    
    
    //function sort_and_update(data){
    //    console.log(data);
    //    data.sort(function(a, b) {
    //        //console.log("a= " + a + " b= " + b);
    //        return Date.parse(a.date) - Date.parse(b.date);
    //    });
    //    console.log("////////////////////////////");
    //    var logelement = $("<li>");
    //    $.each(data, function(){
    //        $(logelement).append("<p>first name: " + first_name + " </p>");
    //        $(logelement).append("<p>last name: " + last_name + " </p>");
    //        $(logelement).append("<p>date: " + date + " </p>");
    //        $(logelement).append("<p>phone: " + phone + " </p>");
    //        $(logelement).append("<p>email: " + email + " </p>");
    //        console.log(this);
    //    });
    //    $("#log").prepend(logelement);
    //}
    
    
    var elems = $.makeArray($(".dateDiv"));
    var dates = [];
    var res_objs = [];
    
    for(var i=0; i<elems.length; i++){
        //console.log(elems[i].innerHTML);
        dates.push(parseDate((elems[i].innerHTML).toString()));
        res_objs.push(new reservation(dates[i]));
        console.log(res_objs[i]);
    }
    
    //sort_and_update(dates);
    sort_and_update(res_objs);
    
    /**
     * firebase shit; more like playing with fire ahhhhhhhh
     */
    var myDataRef = new Firebase('https://neutral-cycle.firebaseio.com/');
    
    //myDataRef.limitToLast(10).on('child_added', function (snapshot) {
    //    //GET DATA
    //    var _data = snapshot.val();
    //    
    //    var date        = _data.date;
    //    var email       = _data.email;
    //    var first_name  = _data.first_name;
    //    var last_name   = _data.last_name; 
    //    var phone       = _data.phone;
    //    
    //    data.push(_data);
    //    console.log(_data);
    //});
    
    //myDataRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
    //    snapshot.forEach(function(data) {
    //        console.log("The " + data.key() + " date is " + data.val().date);
    //    });
    //});
    
    //console.log(data);
    //sort_and_update(data);
});