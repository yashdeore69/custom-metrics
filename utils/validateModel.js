// This script tests the Metric model's validation rules using async/await.
// Run it with: node utils/validateModel.js

const mongoose = require('mongoose');
const Metric = require('../models/Metric');

// Create a Metric instance with missing required fields
const invalidMetric = new Metric({});

async function runValidation() {
  try {
    // Validate the metric (this will throw if there are errors)
    await invalidMetric.validate();
    console.log('No validation errors!');
  } catch (err) {
    console.log('Validation errors:');
    // Print each validation error
    for (const field in err.errors) {
      console.log(`- ${field}: ${err.errors[field].message}`);
    }
  } finally {
    // Exit the process
    process.exit();
  }
}

runValidation(); 