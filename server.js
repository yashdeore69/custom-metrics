// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Custom Metrics API is running!');
});

// Use the metrics router for all /api/metrics endpoints
app.use('/api/metrics', require('./routes/metrics'));

// Get port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 