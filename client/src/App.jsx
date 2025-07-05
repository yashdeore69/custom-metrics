import React from 'react';
import MetricsPage from './pages/MetricsPage';
import { Toaster } from 'sonner';

// App component renders the MetricsPage for now
function App() {
  return (
    <>
      <MetricsPage />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
