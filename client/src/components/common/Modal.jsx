// Modal.jsx
// A reusable modal component for displaying forms and content overlays.
// This modal uses Tailwind CSS for styling and includes:
// - Backdrop (semi-transparent overlay that covers the entire screen)
// - Centered content container with white background and shadow
// - Close button in the top-right corner
// - Click outside to close functionality
// - Proper z-index to appear above other content

import React from 'react';

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
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
      onClick={handleBackdropClick}
    >
      {/* Modal content: centered white container with shadow and rounded corners */}
      <div style={{
        backgroundColor: 'white',
        padding: '0',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
      }}>
        {/* Header: contains title and close button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>{title}</h2>
          {/* Close button: X icon that closes the modal */}
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: 'none',
              padding: '8px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        {/* Modal body: contains the form or other content */}
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 