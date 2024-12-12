// src/controllers/challengeController.js
const Challenge = require('../models/Challenge');

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Private
const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch challenges', error: error.message });
  }
};

// @desc    Add a new challenge
// @route   POST /api/challenges
// @access  Private
// src/controllers/challengeController.js
const addChallenge = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  if (!name || !description || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const challenge = await Challenge.create({
      name,
      description,
      startDate,
      endDate,
      createdBy: req.user.id, // Include the user ID of the currently logged-in user
    });

    res.status(201).json(challenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add challenge', error: error.message });
  }
};

// @desc    Join a challenge
// @route   POST /api/challenges/:id/join
// @access  Private
const joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Simulating participant addition (extend this logic as needed)
    challenge.participants.push({ user: req.user.id, progress: 0 });
    await challenge.save();

    res.status(200).json({ message: 'Successfully joined the challenge' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to join challenge', error: error.message });
  }
};

// @desc    Get participants for a challenge
// @route   GET /api/challenges/:id/participants
// @access  Private
const getParticipants = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate('participants.user', 'name email');

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.status(200).json(challenge.participants);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch participants', error: error.message });
  }
};

module.exports = {
  getChallenges,
  addChallenge,
  joinChallenge,
  getParticipants,
};
