import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MetricForm from '../components/MetricForm';
import Modal from '../components/common/Modal';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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

  // Handler for confirming metric deletion
  const handleConfirmDelete = async (metric) => {
    try {
      console.log('Attempting to delete metric:', metric._id);
      const response = await axios.delete(`/api/metrics/${metric._id}`, {
        headers: {
          'Authorization': 'Bearer CURSORPROTOTYPE',
        },
      });
      console.log('Delete response:', response.data);
      toast.success('Metric deleted successfully!');
      fetchMetrics(); // Refresh the list
    } catch (error) {
      console.error('Delete error:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to delete metric. Please try again.';
      toast.error(errorMessage);
    }
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Form Section - Centered like a login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Metrics Dashboard</h1>
            <p className="text-gray-600">Add and manage your custom metrics</p>
          </div>
          <MetricForm
            onMetricAdded={handleMetricAdded}
            onMetricAddError={handleMetricAddError}
            success={formSuccess}
            error={formError}
          />
        </div>
      </div>

      {/* Cards Section - Below the form */}
      {metrics.length > 0 && (
        <div className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Your Metrics ({metrics.length})
            </h2>
            {/* 3 columns grid, centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-6 max-w-5xl">
                {metrics.map((metric) => (
                  <Card key={metric._id} className="shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-900 truncate mb-2">
                            {metric.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {metric.calculationType}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {metric.description && (
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          {metric.description}
                        </p>
                      )}
                      <div className="bg-gray-50 rounded-md p-3 mb-4">
                        <p className="text-gray-500 text-xs font-medium mb-1">Formula</p>
                        <p className="text-gray-700 text-sm font-mono">{metric.formula}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEditClick(metric)}
                          aria-label={`Edit ${metric.name}`}
                          className="flex-1"
                        >
                          Edit Metric
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              aria-label={`Delete ${metric.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-md border border-gray-300 shadow-lg" style={{ backgroundColor: 'white' }}>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-gray-900">Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-700">
                                This will permanently delete "{metric.name}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-gray-300 hover:bg-gray-400 text-gray-800">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleConfirmDelete(metric)} 
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {/* Fill empty spaces to maintain 3-column layout */}
                {Array.from({ length: (3 - (metrics.length % 3)) % 3 }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-0"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
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