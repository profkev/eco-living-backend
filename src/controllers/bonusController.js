// src/controllers/bonusController.js
const Bonus = require('../models/Bonus');

// Add Bonus
const addBonus = async (req, res) => {
    const { bonusType, value } = req.body;

    if (!bonusType || !value) {
        return res.status(400).json({ message: 'Bonus type and value are required' });
    }

    try {
        const bonus = await Bonus.create({
            bonusType,
            value,
            createdBy: req.user ? req.user.id : 'Admin',
        });
        res.status(201).json({ message: 'Bonus added successfully!', bonus });
    } catch (error) {
        console.error('Error adding bonus:', error.message);
        res.status(500).json({ message: 'Failed to add bonus', error: error.message });
    }
};

// Redeem Bonus
const redeemBonus = async (req, res) => {
    try {
        const bonus = await Bonus.findById(req.params.id);

        if (!bonus) {
            return res.status(404).json({ message: 'Bonus not found' });
        }

        // Mark as redeemed
        bonus.redeemedBy = req.user.id;
        bonus.redeemedAt = Date.now();
        await bonus.save();

        res.status(200).json({ message: 'Bonus redeemed successfully!', bonus });
    } catch (error) {
        console.error('Error redeeming bonus:', error.message);
        res.status(500).json({ message: 'Failed to redeem bonus', error: error.message });
    }
};

module.exports = { addBonus, redeemBonus };
