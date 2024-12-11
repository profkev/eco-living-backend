const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db'); // Import the database connection function

// Load environment variables
console.log('Loading environment variables...');
dotenv.config();

// Initialize the app
console.log('Initializing app...');
const app = express();

// Middleware setup
console.log('Setting up middleware...');
app.use(cors()); // Enable Cross-Origin Resource Sharing for all origins
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
console.log('Connecting to MongoDB...');
connectDB(); // Connect to the database

// Routes setup
console.log('Setting up routes...');
const userRoutes = require('./src/routes/userRoutes'); // Import user routes
const goalRoutes = require('./src/routes/goalRoutes'); // Import goal routes

app.use('/api/users', userRoutes); // Use user routes
app.use('/api/goals', goalRoutes); // Use goal routes

// Define the PORT
const PORT = process.env.PORT || 5000;

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ message: 'Something went wrong on the server.', error: err.message });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
