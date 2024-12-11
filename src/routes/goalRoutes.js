const express = require('express');
const { getGoals, createGoal, deleteGoal, updateGoalProgress } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getGoals); // Protected route to get goals
router.post('/', protect, createGoal); // Protected route to create a goal
router.delete('/:id', protect, deleteGoal); // Protected route to delete a goal
router.put('/:id', protect, updateGoalProgress); // Protected route to update goal progress

module.exports = router;
