const express = require('express');
const { getGroups, joinGroup, leaveGroup } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all groups
router.get('/', protect, getGroups);

// Join a group
router.post('/:id/join', protect, joinGroup);

// Leave a group
router.post('/:id/leave', protect, leaveGroup);

module.exports = router;
