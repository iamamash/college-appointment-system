const express = require('express');
const Availability = require('../models/Availability');
const auth = require('../middleware/auth');

const router = express.Router();

// Add availability
router.post('/', auth('professor'), async (req, res) => {
  const { availableSlots } = req.body;
  try {
    const availability = new Availability({ professorId: req.user.id, availableSlots });
    await availability.save();
    res.status(201).json({ message: 'Availability added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

