// Express router for metric-related endpoints
const express = require('express');
const router = express.Router();

// Import the metric controller
const metricController = require('../controllers/metricController');

// GET /api/metrics - fetch all metrics
router.get('/', metricController.getAll);

// POST /api/metrics - create a new metric
router.post('/', metricController.create);

// PUT /api/metrics/:id - update a metric by ID
router.put('/:id', metricController.update);

// DELETE /api/metrics/:id - delete a metric by ID
router.delete('/:id', metricController.remove);

// Export the router
module.exports = router; 