const mongoose = require('mongoose');

const carbonLogSchema = new mongoose.Schema({
  transportation: { type: Number, required: true },
  energyUsage: { type: Number, required: true },
  waste: { type: Number, default: 0 },
  totalFootprint: { type: Number },
  date: { type: Date, default: Date.now }, // Ensure this field is included
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('CarbonLog', carbonLogSchema);
