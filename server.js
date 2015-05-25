// server.js

// BASE SETUP
// =============================================================================
var mongoose   = require('mongoose');
mongoose.connect('localhost', 'test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Request is received.');
    next(); // make sure we go to the next routes and don't stop here
});


// api root (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our Northstar Live api!' });
});


//---------------------POST, GET, /api/user ------------------------
var User = require('./db/models/user');
router.route('/user')

// create a new user (accessed at POST http://localhost:8080/api/user)
.post(function(req, res) {

  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save(function(err) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ success: true, message: "New user created"});
  });

})

// get all users in db, (accessed at GET http://localhost:8080/api/user)
.get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(users);
  });
});












// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening happens on port ' + port);
