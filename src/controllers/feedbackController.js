const Feedback = require('../models/Feedback');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
const submitFeedback = async (req, res) => {
  const { feedbackText } = req.body;

  if (!feedbackText) {
    return res.status(400).json({ message: 'Feedback text is required.' });
  }

  try {
    const feedback = await Feedback.create({
      feedbackText,
      feedbackDate: new Date(), // Add the current date
      userId: req.user.id, // Ensure `req.user` is populated by the auth middleware
    });

    res.status(201).json({ message: 'Feedback submitted successfully!', feedback });
  } catch (error) {
    console.error('Error submitting feedback:', error.message);
    res.status(500).json({ message: 'Failed to submit feedback.', error: error.message });
  }
};

// @desc    View feedback
// @route   GET /api/feedback
// @access  Admin
const viewFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).populate('userId', 'name email');
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error.message);
    res.status(500).json({ message: 'Failed to fetch feedback.', error: error.message });
  }
};

module.exports = { submitFeedback, viewFeedback };
