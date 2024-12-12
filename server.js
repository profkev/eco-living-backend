const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // For request logging
const connectDB = require('./src/config/db');

// Load environment variables
dotenv.config();
console.log('Loading environment variables...');

// Initialize the app
const app = express();
console.log('Initializing app...');

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing for all origins
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Add request logging

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process with failure
  }
})();

// Modular Routes setup
console.log('Setting up routes...');
const routes = [
  { path: '/api/users', route: require('./src/routes/userRoutes') },
  { path: '/api/goals', route: require('./src/routes/goalRoutes') },
  { path: '/api/recommendations', route: require('./src/routes/recommendationRoutes') },
  { path: '/api/bonus', route: require('./src/routes/bonusRoutes') },
  { path: '/api/groups', route: require('./src/routes/communityGroupRoutes') },
  { path: '/api/challenges', route: require('./src/routes/challengeRoutes') },
  { path: '/api/feedback', route: require('./src/routes/feedbackRoutes') },
  { path: '/api/carbon-logs', route: require('./src/routes/carbonLogRoutes') },
];

// Register routes
routes.forEach(({ path, route }) => {
  app.use(path, route);
});

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({
    message: 'Something went wrong on the server.',
    error: err.message,
  });
});

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
