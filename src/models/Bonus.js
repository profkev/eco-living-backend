const mongoose = require('mongoose');

const bonusSchema = mongoose.Schema(
  {
    bonusType: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    redeemedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    redeemedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Bonus = mongoose.model('Bonus', bonusSchema);
module.exports = Bonus;
