import React, { useState } from 'react';
import axios from 'axios';

// MetricForm.jsx
// This form lets users add a new metric. It uses Tailwind CSS utility classes for a clean, modern look.
// Layout: Each field is stacked vertically with consistent spacing (using 'space-y-4').
// Styling: Labels are bold for clarity. Inputs use 'border', 'rounded', and 'p-2' for accessibility and aesthetics.
// Comments throughout explain structure and styling for beginners.
const MetricForm = ({ onMetricAdded, onMetricAddError, success, error }) => {
  // State for each input field
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [calculationType, setCalculationType] = useState('count');
  const [formula, setFormula] = useState('');
  // State for loading
  const [loading, setLoading] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (onMetricAddError) onMetricAddError(null);
    try {
      // POST to the backend API with the required Authorization header
      await axios.post(
        '/api/metrics',
        {
          name,
          description,
          calculationType,
          formula,
        },
        {
          headers: {
            'Authorization': 'Bearer CURSORPROTOTYPE',
          },
        }
      );
      // Clear the form
      setName('');
      setDescription('');
      setCalculationType('count');
      setFormula('');
      // Notify parent to refresh metrics and show success
      if (onMetricAdded) onMetricAdded();
    } catch (err) {
      if (onMetricAddError) {
        onMetricAddError(
          err.response?.data?.message || 'Failed to add metric. Please try again.'
        );
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
      {/* Success message: shown if metric is added successfully */}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2">Metric added successfully!</div>
      )}

      {/* Submit button: disabled if loading or required fields are empty */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        disabled={loading || !name || !formula}
        aria-busy={loading}
      >
        {loading ? 'Adding...' : 'Add Metric'}
      </button>
    </form>
  );
};

export default MetricForm; 