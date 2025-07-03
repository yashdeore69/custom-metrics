// Import mongoose to define the schema
const mongoose = require('mongoose');

// Define the Metric schema
const MetricSchema = new mongoose.Schema({
  // Name of the metric (required)
  name: { type: String, required: true, trim: true },
  // Short description (optional, max 250 chars)
  description: { type: String, default: '', maxlength: 250 },
  // Type of calculation (required, must be one of the specified values)
  calculationType: { type: String, enum: ['count','percentage','time'], required: true },
  // Formula for the metric (required)
  formula: { type: String, required: true },
  // Date when the metric was created (defaults to now)
  createdAt: { type: Date, default: Date.now }
});

// Export the Metric model
module.exports = mongoose.model('Metric', MetricSchema); 