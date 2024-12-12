// src/controllers/recommendationController.js
const Recommendation = require('../models/Recommendation');
const CarbonLog = require('../models/CarbonLog');

// @desc    Generate recommendations
// @route   GET /api/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    // Fetch user's carbon logs
    const logs = await CarbonLog.find({ user: req.user.id });

    if (!logs.length) {
      return res.status(200).json({ tips: ['Log your daily activities to get recommendations.'] });
    }

    // Analyze logs to generate tips
    const totalTransportation = logs.reduce((sum, log) => sum + parseFloat(log.transportation), 0);
    const totalEnergy = logs.reduce((sum, log) => sum + parseFloat(log.energyUsage), 0);
    const totalWaste = logs.reduce((sum, log) => sum + parseFloat(log.waste), 0);

    const tips = [];

    if (totalTransportation > 50) tips.push('Consider carpooling or using public transport.');
    if (totalEnergy > 30) tips.push('Switch to energy-efficient appliances or reduce electricity use.');
    if (totalWaste > 20) tips.push('Recycle more and reduce single-use plastics.');

    if (!tips.length) tips.push('Great job! Keep up your sustainable efforts.');

    // Save the recommendations for the user
    const recommendation = await Recommendation.findOneAndUpdate(
      { user: req.user.id },
      { tips },
      { new: true, upsert: true }
    );

    res.status(200).json(recommendation);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ message: 'Failed to generate recommendations', error: error.message });
  }
};

module.exports = { getRecommendations };
