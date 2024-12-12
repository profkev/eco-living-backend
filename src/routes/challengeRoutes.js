// src/routes/challengeRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getChallenges,
  joinChallenge,
  getParticipants,
  addChallenge, // Import the addChallenge controller
} = require('../controllers/challengeController');

const router = express.Router();

router.get('/', protect, getChallenges); // Get all challenges
router.post('/', protect, addChallenge); // Add a new challenge
router.post('/:id/join', protect, joinChallenge); // Join a challenge
router.get('/:id/participants', protect, getParticipants); // Get participants

module.exports = router;
