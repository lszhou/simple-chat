// Basic setup
//==================================================

// configure datebase
var mongoose   = require('mongoose');
mongoose.connect('localhost', 'test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

// require related modules
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// public routes (all of which will be prefixed with /auth)
// =========================================================
var authRouter = require('./routes/auth')(app, express);
app.use('/auth', authRouter);


// Insert authentication middleware - checks tokens
//=========================================================
var authMiddleware = require('./auth-middleware');
app.use(authMiddleware);


// Protected routes
//==========================================================
var userAPI = require('./routes/api/user')(app, express);
app.use('/api', userAPI);
















// Protected routes, Router-level middleware
// ===========================================================
/*
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // logging process
    console.log('Request is received.');
    next();
});


// api root (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our Northstar Live api!' });
});


// End point /api/user
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
*/

// all of our routes will be prefixed with /api
//app.use('/api', router);

//====================================================================


// Start Server
// =============================================================================

var port = process.env.PORT || 8080; // set our port
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening happens on port ' + port);
  }
});
