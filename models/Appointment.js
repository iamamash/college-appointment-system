const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slot: { type: Date, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);

