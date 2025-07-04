import React, { useEffect, useState } from 'react';
import axios from 'axios';

// MetricsPage: Fetches and displays a list of metrics from the backend API
const MetricsPage = () => {
  // State to hold the list of metrics
  const [metrics, setMetrics] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Fetch metrics from the backend API
    axios.get('/api/metrics')
      .then(response => {
        // Set the metrics state with the data from the API
        setMetrics(response.data.data || []);
        setLoading(false);
      })
      .catch(error => {
        // If there's an error, log it (error handling will be improved in the next task)
        console.error('Error fetching metrics:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

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

  // Render the list of metrics (UI will be improved in the next task)
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Metrics</h1>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
};

export default MetricsPage; 