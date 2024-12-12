const CarbonLog = require('../models/CarbonLog');

// @desc    Add a carbon log
// @route   POST /api/carbon-logs
// @access  Private
const addCarbonLog = async (req, res) => {
  const { transportation, energyUsage, waste } = req.body;

  // Validate required fields
  if (!transportation || !energyUsage) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Calculate the total footprint
    const totalFootprint = parseFloat(transportation) + parseFloat(energyUsage) + parseFloat(waste || 0);

    // Create a new carbon log
    const carbonLog = await CarbonLog.create({
      transportation,
      energyUsage,
      waste: waste || 0, // Default waste to 0 if not provided
      totalFootprint, // Include calculated total footprint
      user: req.user.id,
      date: new Date(), // Set the current date
    });

    res.status(201).json(carbonLog);
  } catch (error) {
    console.error('Error adding carbon log:', error);
    res.status(500).json({ message: 'Failed to add carbon log', error: error.message });
  }
};

// @desc    Get all carbon logs
// @route   GET /api/carbon-logs
// @access  Private
const getCarbonLogs = async (req, res) => {
  try {
    // Fetch carbon logs for the authenticated user
    const logs = await CarbonLog.find({ user: req.user.id }).sort({ date: -1 }); // Sort by latest date
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching carbon logs:', error);
    res.status(500).json({ message: 'Failed to fetch carbon logs', error: error.message });
  }
};

module.exports = { addCarbonLog, getCarbonLogs };
