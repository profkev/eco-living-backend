const express = require('express');
const { submitFeedback, viewFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes for feedback
router.post('/', protect, submitFeedback); // Submit feedback
router.get('/', protect, viewFeedback);    // View feedback

module.exports = router;
