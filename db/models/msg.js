var mongoose = require('mongoose');

var msgSchema = new mongoose.Schema({
  user: String,
  time: {
    type: Date,
    default: Date.now
  },
  msg: String
});

Msg = module.exports = mongoose.model('Msg', msgSchema);
