const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token); // Debugging log

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Debugging log

      // Attach user to the request
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User attached to request:', req.user); // Debugging log

      next();
    } catch (error) {
      console.error('Error in token verification:', error.message); // Debugging log
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    console.error('No token provided'); // Debugging log
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
