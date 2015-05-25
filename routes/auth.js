var jwt = require('jsonwebtoken');
var User = require('../db/models/user');
var secretKey = require('../config/config').secretKey;

var createToken = function(user){
    var token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    }, secretKey, { expiresInMinute: 1440 });

    return token;
};

module.exports = function(app, express) {

    var auth = express.Router();

    auth.post('/signup', function(req, res){
        var user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        user.save( function(err){
            if(err){
                res.send(err);
                return;
            }
            res.json({ success: true, message: "new user created"});
        });
    });

    auth.post('/login', function(req, res){
        User.findOne({
            username: req.body.username
        }).select('password').exec(function(err, user) {
            if(err) throw err;
            if(!user) {
                res.send("User does not exist");
            }
            if(!user.comparePassword(req.body.password)) {
                res.status(401).send({success:false, message:"bad password"});
            }
            // create token, etc.
            var token = createToken(user);

            res.json({
                success: true,
                message: "login successful",
                token: token,
            });
        });
    });

    return auth;
};
