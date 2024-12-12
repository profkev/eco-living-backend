const Group = require('../models/Group');

// @desc    Get all groups
// @route   GET /api/groups
// @access  Private
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.status(200).json({ groups });
  } catch (error) {
    console.error('Error fetching groups:', error.message);
    res.status(500).json({ message: 'Failed to fetch groups', error: error.message });
  }
};

// @desc    Join a group
// @route   POST /api/groups/:id/join
// @access  Private
const joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    group.membershipCount += 1; // Increment membership count
    await group.save();

    res.status(200).json({ message: 'Joined group successfully', group });
  } catch (error) {
    console.error('Error joining group:', error.message);
    res.status(500).json({ message: 'Failed to join group', error: error.message });
  }
};

// @desc    Leave a group
// @route   POST /api/groups/:id/leave
// @access  Private
const leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    group.membershipCount -= 1; // Decrement membership count
    await group.save();

    res.status(200).json({ message: 'Left group successfully', group });
  } catch (error) {
    console.error('Error leaving group:', error.message);
    res.status(500).json({ message: 'Failed to leave group', error: error.message });
  }
};

module.exports = { getGroups, joinGroup, leaveGroup };
