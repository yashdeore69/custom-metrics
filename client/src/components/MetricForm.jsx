import React, { useState } from 'react';
import axios from 'axios';

// MetricForm: Form to add a new metric
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4">
      {/* Name input */}
      <div>
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

      {/* Description textarea */}
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

      {/* Calculation Type select */}
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

      {/* Formula input */}
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

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2">{error}</div>
      )}
      {/* Success message */}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2">Metric added successfully!</div>
      )}

      {/* Submit button */}
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