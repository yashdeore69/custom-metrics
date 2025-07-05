import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MetricForm.jsx
// This form lets users add a new metric or edit an existing one.
// It uses Tailwind CSS utility classes for a clean, modern look.
// Layout: Each field is stacked vertically with consistent spacing (using 'space-y-4').
// Styling: Labels are bold for clarity. Inputs use 'border', 'rounded', and 'p-2' for accessibility and aesthetics.
// Comments throughout explain structure and styling for beginners.
const MetricForm = ({ 
  onMetricAdded, 
  onMetricAddError, 
  onMetricUpdated, 
  onMetricUpdateError,
  success, 
  error,
  metric = null, // Metric data for edit mode
  isEdit = false // Flag to determine if we're editing or creating
}) => {
  // State for each input field
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [calculationType, setCalculationType] = useState('count');
  const [formula, setFormula] = useState('');
  // State for loading
  const [loading, setLoading] = useState(false);

  // Populate form fields when editing an existing metric
  useEffect(() => {
    if (isEdit && metric) {
      setName(metric.name || '');
      setDescription(metric.description || '');
      setCalculationType(metric.calculationType || 'count');
      setFormula(metric.formula || '');
    }
  }, [isEdit, metric]);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Clear any previous errors
    if (isEdit && onMetricUpdateError) {
      onMetricUpdateError(null);
    } else if (!isEdit && onMetricAddError) {
      onMetricAddError(null);
    }

    try {
      const metricData = {
        name,
        description,
        calculationType,
        formula,
      };

      if (isEdit && metric) {
        // Update existing metric using PUT
        await axios.put(
          `/api/metrics/${metric._id}`,
          metricData,
          {
            headers: {
              'Authorization': 'Bearer CURSORPROTOTYPE',
            },
          }
        );
        // Notify parent of successful update
        if (onMetricUpdated) onMetricUpdated();
      } else {
        // Create new metric using POST
        await axios.post(
          '/api/metrics',
          metricData,
          {
            headers: {
              'Authorization': 'Bearer CURSORPROTOTYPE',
            },
          }
        );
        // Clear the form only for new metrics
        setName('');
        setDescription('');
        setCalculationType('count');
        setFormula('');
        // Notify parent to refresh metrics and show success
        if (onMetricAdded) onMetricAdded();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (isEdit ? 'Failed to update metric. Please try again.' : 'Failed to add metric. Please try again.');
      
      if (isEdit && onMetricUpdateError) {
        onMetricUpdateError(errorMessage);
      } else if (!isEdit && onMetricAddError) {
        onMetricAddError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // The form uses Tailwind for background, padding, rounded corners, and shadow.
    // 'space-y-4' adds vertical space between each child div (form field).
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4">
      {/* Name input: required field */}
      <div>
        {/* Label is bold and linked to input by htmlFor/id */}
        <label htmlFor="name" className="block font-bold mb-1">Name</label>
        <input
          id="name"
          type="text"
          className="border rounded p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      {/* Description textarea: optional, allows up to 3 lines */}
      <div>
        <label htmlFor="description" className="block font-bold mb-1">Description</label>
        <textarea
          id="description"
          className="border rounded p-2 w-full"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      {/* Calculation Type select: dropdown for metric type */}
      <div>
        <label htmlFor="calculationType" className="block font-bold mb-1">Calculation Type</label>
        <select
          id="calculationType"
          className="border rounded p-2 w-full"
          value={calculationType}
          onChange={e => setCalculationType(e.target.value)}
          required
        >
          <option value="count">Count</option>
          <option value="percentage">Percentage</option>
          <option value="time">Time</option>
        </select>
      </div>

      {/* Formula input: required field for the metric's calculation formula */}
      <div>
        <label htmlFor="formula" className="block font-bold mb-1">Formula</label>
        <input
          id="formula"
          type="text"
          className="border rounded p-2 w-full"
          value={formula}
          onChange={e => setFormula(e.target.value)}
          required
        />
      </div>

      {/* Error message: shown if API returns an error */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2">{error}</div>
      )}
      {/* Success message: shown if metric is added/updated successfully */}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2">
          {isEdit ? 'Metric updated successfully!' : 'Metric added successfully!'}
        </div>
      )}

      {/* Submit button: disabled if loading or required fields are empty */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        disabled={loading || !name || !formula}
        aria-busy={loading}
      >
        {loading 
          ? (isEdit ? 'Updating...' : 'Adding...') 
          : (isEdit ? 'Update Metric' : 'Add Metric')
        }
      </button>
    </form>
  );
};

export default MetricForm; 