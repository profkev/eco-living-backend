const Goal = require('../models/Goal');

// @desc    Get all goals for the user
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 }); // Sort by latest goals
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error.message);
    res.status(500).json({ message: 'Failed to fetch goals', error: error.message });
  }
};

// @desc    Create a new goal
// @route   POST /api/goals
// @access  Private
const createGoal = async (req, res) => {
  const { goalType, target, completionDate } = req.body;

  if (!goalType || !target || !completionDate) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newGoal = await Goal.create({
      goalType,
      target,
      completionDate,
      progress: 0, // Default progress starts at 0
      user: req.user.id,
    });
    res.status(201).json(newGoal);
  } catch (error) {
    console.error('Error creating goal:', error.message);
    res.status(500).json({ message: 'Failed to create goal', error: error.message });
  }
};

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res) => {
    try {
      const goal = await Goal.findById(req.params.id);
  
      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }
  
      if (goal.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to delete this goal' });
      }
  
      await Goal.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of goal.remove()
      res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
      console.error('Error deleting goal:', error.message);
      res.status(500).json({ message: 'Failed to delete goal', error: error.message });
    }
  };
  

// @desc    Update goal progress
// @route   PUT /api/goals/:id
// @access  Private
const updateGoalProgress = async (req, res) => {
  const { progress } = req.body;

  if (progress < 0) {
    return res.status(400).json({ message: 'Progress cannot be negative' });
  }

  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this goal' });
    }

    goal.progress = progress;
    await goal.save();
    res.status(200).json(goal);
  } catch (error) {
    console.error('Error updating goal progress:', error.message);
    res.status(500).json({ message: 'Failed to update progress', error: error.message });
  }
};

module.exports = { getGoals, createGoal, deleteGoal, updateGoalProgress };
