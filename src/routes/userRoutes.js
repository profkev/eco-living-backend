const express = require('express');
const { registerUser, loginUser, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', protect, updateProfile); // Add the update profile route

module.exports = router;
