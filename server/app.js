var express = require('express');
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var stripe = require('stripe')('sk_test_6BG4GqGS8rUMo1Zd7Jkp89EN');

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 



app.post('/charge', function(req, res) {
    console.log(req.body);

    var stripeToken = req.body.id;
    
    var payload = {
        amount: 10000, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: "email@email.com"
    };
    
    console.log(payload);

    var charge = stripe.charges.create(payload, function(err, charge) {
        if (err) {
            console.log(JSON.stringify(err, null, 2));
            res.send(err);
        } else {
            res.send("completed payment!");
        }
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});