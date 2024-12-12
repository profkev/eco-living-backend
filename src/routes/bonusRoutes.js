const express = require('express');
const { addBonus, redeemBonus } = require('../controllers/bonusController');
const { protect } = require('../middleware/authMiddleware');
const Bonus = require('../models/Bonus'); // Import the Bonus model

const router = express.Router();

// Add a new bonus
router.post('/', protect, addBonus);

// Get all bonuses
router.get('/', protect, async (req, res) => {
  try {
    const bonuses = await Bonus.find({});
    res.status(200).json({ bonuses });
  } catch (error) {
    console.error('Error fetching bonuses:', error.message);
    res.status(500).json({ message: 'Failed to fetch bonuses', error: error.message });
  }
});

// Redeem a bonus
router.post('/:id/redeem', protect, redeemBonus);

module.exports = router;
