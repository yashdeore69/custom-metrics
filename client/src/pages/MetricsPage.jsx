import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MetricForm from '../components/MetricForm';
import Modal from '../components/common/Modal';

// MetricsPage: Fetches and displays a list of metrics from the backend API
// Now includes edit functionality with modal overlay for editing existing metrics
const MetricsPage = () => {
  // State to hold the list of metrics
  const [metrics, setMetrics] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to track error status
  const [error, setError] = useState(null);
  // State for MetricForm feedback (add new metrics)
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);
  // State for edit form feedback
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState(null);

  // Function to fetch metrics from the backend API
  const fetchMetrics = () => {
    setLoading(true);
    setError(null);
    axios.get('/api/metrics')
      .then(response => {
        setMetrics(response.data.data || []);
        setLoading(false);
      })
      .catch(error => {
        // Set error state if fetch fails
        setError('Failed to load metrics.');
        setLoading(false);
      });
  };

  // useEffect runs once when the component mounts
  useEffect(() => {
    fetchMetrics();
  }, []); // Empty dependency array means this runs once on mount

  // Handler for successful metric add
  const handleMetricAdded = () => {
    setFormSuccess(true);
    setFormError(null);
    fetchMetrics();
    setTimeout(() => setFormSuccess(false), 2000);
  };

  // Handler for metric add error
  const handleMetricAddError = (msg) => {
    setFormError(msg);
    setFormSuccess(false);
    setTimeout(() => setFormError(null), 2000);
  };

  // Handler for opening edit modal
  const handleEditClick = (metric) => {
    setEditingMetric(metric);
    setIsEditModalOpen(true);
    setEditSuccess(false);
    setEditError(null);
  };

  // Handler for closing edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingMetric(null);
    setEditSuccess(false);
    setEditError(null);
  };

  // Handler for successful metric update
  const handleMetricUpdated = () => {
    setEditSuccess(true);
    setEditError(null);
    fetchMetrics();
    // Close modal after a short delay to show success message
    setTimeout(() => {
      handleCloseEditModal();
    }, 1500);
  };

  // Handler for metric update error
  const handleMetricUpdateError = (msg) => {
    setEditError(msg);
    setEditSuccess(false);
    setTimeout(() => setEditError(null), 3000);
  };

  // Show a loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Simple loading spinner using Tailwind CSS */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-lg">Loading metrics...</span>
      </div>
    );
  }

  // Show error banner if fetch fails
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50">
        <div className="bg-red-200 text-red-800 px-6 py-4 rounded shadow-md mb-4">
          {error}
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          onClick={fetchMetrics}
          aria-label="Retry fetching metrics"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render the MetricForm and the list of metrics as Card components
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Metrics</h1>
      {/* MetricForm for adding new metrics; refreshes list on add */}
      <MetricForm
        onMetricAdded={handleMetricAdded}
        onMetricAddError={handleMetricAddError}
        success={formSuccess}
        error={formError}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {/* Map each metric to a Card */}
        {metrics.map((metric) => (
          <div
            key={metric._id}
            className="p-4 m-2 shadow-md rounded-lg bg-white flex flex-col"
          >
            {/* Metric name in bold */}
            <span className="font-bold text-lg mb-2">{metric.name}</span>
            {/* calculationType as a badge */}
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full w-max mb-2">
              {metric.calculationType}
            </span>
            {/* Optionally show description and formula for context */}
            {metric.description && (
              <p className="text-gray-600 text-sm mb-1">{metric.description}</p>
            )}
            <p className="text-gray-400 text-xs">Formula: {metric.formula}</p>
            
            {/* Edit button: opens modal with metric data */}
            <button
              onClick={() => {
                handleEditClick(metric);
              }}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition self-start"
              aria-label={`Edit ${metric.name}`}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal: displays MetricForm in edit mode */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit Metric"
      >
        <MetricForm
          metric={editingMetric}
          isEdit={true}
          onMetricUpdated={handleMetricUpdated}
          onMetricUpdateError={handleMetricUpdateError}
          success={editSuccess}
          error={editError}
        />
      </Modal>
    </div>
  );
};

export default MetricsPage; 