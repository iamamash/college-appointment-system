const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const availabilityRoutes = require('./routes/availability');
const appointmentRoutes = require('./routes/appointment');

// Middleware for routes
app.use('/auth', authRoutes);
app.use('/availability', availabilityRoutes);
app.use('/appointment', appointmentRoutes);

const PORT = process.env.PORT || 27017;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
})
  .then(() => {
    console.log('Connected to AWS DocumentDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

