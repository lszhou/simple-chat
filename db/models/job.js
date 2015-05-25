var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }]
});

jobSchema.virtual('jobid').get(function() {
  return this._id;
});

Job = module.exports = mongoose.model('Job', jobSchema);
