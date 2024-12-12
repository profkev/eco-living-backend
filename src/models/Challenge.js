// src/models/Challenge.js
const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Challenge name is required'],
  },
  description: {
    type: String,
    required: [true, 'Challenge description is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'CreatedBy is required'],
  },
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      progress: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model('Challenge', challengeSchema);
