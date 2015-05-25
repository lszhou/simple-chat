var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  private: {
    type: Boolean,
    default: false
  },
  message: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Msg'
  }],
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

});

Chat = module.exports = mongoose.model('Chat', chatSchema);
