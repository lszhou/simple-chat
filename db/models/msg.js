// message: text, post time and user
var mongoose = require('mongoose');

var msgSchema = new mongoose.Schema({

  text: String,

  time: {
    type: Date,
    default: Date.now
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

Msg = module.exports = mongoose.model('Msg', msgSchema);
