const mongoose = require('mongoose');

const groupSchema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    membershipCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
