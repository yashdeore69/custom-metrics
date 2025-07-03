// Controller functions for Metric model
// These will handle API requests for metrics

// Get all metrics
exports.getAll = async (req, res) => {
  try {
    // Import the Metric model
    const Metric = require('../models/Metric');
    // Find all metrics, sorted by createdAt (newest first)
    const metrics = await Metric.find().sort({ createdAt: -1 });
    // Respond with success and data
    res.json({ success: true, data: metrics });
  } catch (error) {
    // Handle errors (e.g., database issues)
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Create a new metric
exports.create = async (req, res) => {
  try {
    const Metric = require('../models/Metric');
    // Create a new Metric instance from request body
    const metric = new Metric(req.body);
    // Save the metric to the database
    const savedMetric = await metric.save();
    // Respond with the saved metric
    res.status(201).json({ success: true, data: savedMetric });
  } catch (error) {
    // If validation error, send 400 with details
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    // For other errors, send 500
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update an existing metric
exports.update = async (req, res) => {
  try {
    const Metric = require('../models/Metric');
    // Find metric by ID and update with request body
    const updatedMetric = await Metric.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated doc, run schema validators
    );
    if (!updatedMetric) {
      return res.status(404).json({ success: false, message: 'Metric not found' });
    }
    res.json({ success: true, data: updatedMetric });
  } catch (error) {
    // If validation error, send 400 with details
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Remove (delete) a metric
exports.remove = async (req, res) => {
  try {
    const Metric = require('../models/Metric');
    // Find metric by ID and remove
    const deletedMetric = await Metric.findByIdAndRemove(req.params.id);
    if (!deletedMetric) {
      return res.status(404).json({ success: false, message: 'Metric not found' });
    }
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 