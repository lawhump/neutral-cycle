function submit(){
    //reference to the firebase location
    var myDataRef = new Firebase('https://neutral-cycle.firebaseio.com/');
    /**
     * _name     : user's name
     * _email    : user's email
     * _phone    : user's phone number (e.g. 6154972551)
     * _date     : date to come in to receieve bike (e.g. 021715 for Feb. 17, 2015)
     * _duration : duration, in days 
     */
    var _name, _email, _phone, _date, _duration, _reservationID;
    //list of equipment the user needs
    var _equipment = [];
    
    _name            = "Lawrence Humphrey";
    _email           = "imcoming@you.com";
    _phone           = 2345678900;
    _date            = 021715;
    _duration        = 42;
    _reservationID   = 654321;
    
    myDataRef.set({
        _reservationID: {
            Date: _date,
            Duration : _duration,
            Email : _email,
            Equipment: _equipment,
            Phone: _phone,
        }
    });
}
            
$('#butts').on('click', submit);