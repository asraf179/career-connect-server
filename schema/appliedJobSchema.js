const mongoose = require('mongoose');

const AppliedJobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile', 
    required: true
  },
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', 
  }],
  applied_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('AppliedJob', AppliedJobSchema);