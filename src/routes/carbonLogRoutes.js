const express = require('express');
const { addCarbonLog, getCarbonLogs } = require('../controllers/carbonLogController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addCarbonLog); // Add a carbon log
router.get('/', protect, getCarbonLogs); // Get all carbon logs

module.exports = router;
