const express = require('express');
const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');
const auth = require('../middleware/auth');

const router = express.Router();

// Book an appointment
router.post('/', auth('student'), async (req, res) => {
  const { professorId, slot } = req.body;
  try {
    // Check if the slot is available
    const availability = await Availability.findOne({ professorId });
    if (!availability || !availability.availableSlots.includes(new Date(slot).toISOString())) {
      return res.status(400).json({ message: 'Slot not available' });
    }

    // Create appointment
    const appointment = new Appointment({ studentId: req.user.id, professorId, slot });
    await appointment.save();

    // Remove the slot from availability
    availability.availableSlots = availability.availableSlots.filter(s => s !== new Date(slot).toISOString());
    await availability.save();

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get appointments for a user
router.get('/', auth(), async (req, res) => {
  try {
    const query = req.user.role === 'professor' 
      ? { professorId: req.user.id } 
      : { studentId: req.user.id };

    const appointments = await Appointment.find(query).populate('studentId professorId', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

