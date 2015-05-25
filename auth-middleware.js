var jwt = require('jsonwebtoken');

var secretKey = require('./config/config').secretKey;

module.exports = function(req, res, next) {
  var token = req.body.token || req.params.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        res.status(403).send({
          success: false,
          message: "bad token"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: "no token"
    });
  }
};
