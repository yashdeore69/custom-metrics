import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// MetricForm.jsx
// This form lets users add a new metric or edit an existing one.
// It uses shadcn/ui components for a modern, accessible look.
// Comments throughout explain structure and styling for beginners.
const MetricForm = ({ 
  onMetricAdded, 
  onMetricAddError, 
  onMetricUpdated, 
  onMetricUpdateError,
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
    } else if (!isEdit) {
      setName('');
      setDescription('');
      setCalculationType('count');
      setFormula('');
    }
  }, [isEdit, metric]);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        toast.success('Metric updated successfully!');
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
        toast.success('Metric added successfully!');
        setName('');
        setDescription('');
        setCalculationType('count');
        setFormula('');
        if (onMetricAdded) onMetricAdded();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (isEdit ? 'Failed to update metric. Please try again.' : 'Failed to add metric. Please try again.');
      toast.error(errorMessage);
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
    // The form uses shadcn/ui components for a modern look.
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full space-y-6 border-2 border-gray-300">
      {/* Name input: required field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Enter metric name"
          className="text-gray-900 placeholder:text-gray-500 bg-white"
        />
      </div>
      {/* Description textarea: optional */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          placeholder="Describe the metric (optional)"
          className="min-h-[80px] resize-none text-gray-900 placeholder:text-gray-500 bg-white"
        />
      </div>
      {/* Calculation Type select: dropdown for metric type */}
      <div className="space-y-2">
        <Label htmlFor="calculationType">Calculation Type</Label>
        <Select value={calculationType} onValueChange={setCalculationType}>
          <SelectTrigger id="calculationType" className="w-full text-gray-900 placeholder:text-gray-500 bg-white">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="count">Count</SelectItem>
            <SelectItem value="percentage">Percentage</SelectItem>
            <SelectItem value="time">Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Formula input: required field for the metric's calculation formula */}
      <div className="space-y-2">
        <Label htmlFor="formula">Formula</Label>
        <Input
          id="formula"
          type="text"
          value={formula}
          onChange={e => setFormula(e.target.value)}
          required
          placeholder="e.g. X + Y"
          className="text-gray-900 placeholder:text-gray-500 bg-white"
        />
      </div>
      {/* Submit button: disabled if loading or required fields are empty */}
      <Button
        type="submit"
        disabled={loading || !name || !formula}
        aria-busy={loading}
        className="w-full"
      >
        {loading 
          ? (isEdit ? 'Updating...' : 'Adding...') 
          : (isEdit ? 'Update Metric' : 'Add Metric')
        }
      </Button>
    </form>
  );
};

export default MetricForm; 