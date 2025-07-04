// Express router for metric-related endpoints
const express = require('express');
const router = express.Router();

// Import the metric controller
const metricController = require('../controllers/metricController');
const auth = require('../middleware/auth'); // Import auth middleware

// GET /api/metrics - fetch all metrics (public)
router.get('/', metricController.getAll);

// POST /api/metrics - create a new metric (protected)
router.post('/', auth, metricController.create);

// PUT /api/metrics/:id - update a metric by ID (protected)
router.put('/:id', auth, metricController.update);

// DELETE /api/metrics/:id - delete a metric by ID (protected)
router.delete('/:id', auth, metricController.remove);

// Export the router
module.exports = router; 