const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (role = null) => async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (role && req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied for this role' });
    }
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

