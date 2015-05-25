var jwt = require('jsonwebtoken');
var User = require('../../db/models/user');
var secretKey = require('../../config/config').secretKey;

module.exports = function(app, express) {

    var api = express.Router();

    api.get('/users', function(req, res) {
        // req.decoded.id, req.decoded.iat
        User.find({ }, function(err,users){
            if(err) return next(err);
            res.json(users);
        });
    });

    api.get('/users/:username', function(req, res) {
        User.findOne({ username: req.params.username }, function(err,user){
            if(err) return next(err);
            if(!user) {
                res.status(404).send({success:false, message:"user not found"});
            }
            res.json(user);
        });
    });

    api.put('/users/:username', function(req, res){
      // update user info
      res.send('msg: PUT request is received');
    });


    api.delete('/users/:username', function(req, res){
      // delete user info
      res.send('msg: DELETE request is received');
    });

    return api;
};
