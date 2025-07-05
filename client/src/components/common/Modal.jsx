// Modal.jsx
// A reusable modal component for displaying forms and content overlays.
// This modal uses Tailwind CSS for styling and includes:
// - Backdrop (semi-transparent overlay that covers the entire screen)
// - Centered content container with white background and shadow
// - Close button in the top-right corner
// - Click outside to close functionality
// - Proper z-index to appear above other content

import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, title = "Edit Metric" }) => {
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Backdrop: covers entire screen with semi-transparent background
    // Clicking the backdrop closes the modal
    <div 
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
      style={{ 
        backgroundColor: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Modal content: centered white container with shadow and rounded corners */}
      <div className="bg-white rounded-lg shadow-xl w-[500px] mx-4 z-[9999] border-2 border-gray-300">
        {/* Header: contains title and close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {/* Close button: X icon that closes the modal */}
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal body: contains the form or other content */}
        <div className="p-6 bg-white">
          <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 