var express = require('express');
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var stripe = require('stripe')('sk_test_6BG4GqGS8rUMo1Zd7Jkp89EN');

var passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

var users = [
    { id: 1, username: 'root', password: 'password', email: 'noah.lafferty@gmail.com', location: 'all' },
    { id: 1, username: 'lhumphr2', password: 'runningthruthe6', email: 'noah.lafferty@gmail.com', location: 'pharm' },
    { id: 1, username: 'lisavuong', password: 'pigsnout', email: 'noah.lafferty@gmail.com', location: 'nchq' }
];

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

passport.use(new LocalStrategy(
    function(username, password, done) {
        /*
        users.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
        */
        findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    }
));

app.post('/login',
         passport.authenticate('local', { successRedirect: '/#/reservations',
                                          failureRedirect: '/#/login',
                                          failureFlash: false })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

app.post('/charge', function(req, res) {
    console.log(req.body);

    var stripeToken = req.body.id;
    
    var payload = {
        amount: parseInt(req.query.p), // amount in cents, again
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