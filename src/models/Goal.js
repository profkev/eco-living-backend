const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  goalType: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  completionDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Goal', goalSchema);
