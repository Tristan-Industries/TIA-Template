import React, { useState } from 'react';
import { useAPI } from '@api';

function App() {
  const api = useAPI();
  const [status, setStatus] = useState('Ready');

  const testAlert = () => {
    api.alerts.show("Hello from tiaframe!", "System Test");
  };

  const testFS = async () => {
    try {
      const files = await api.fs.ls('/');
      setStatus(`Found ${files.length} files in /`);
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div style={{ 
      padding: 24, background: '#0e0e18', color: '#e8e8f0', height: '100%', width: '100%',
      fontFamily: 'Segoe UI, Roboto, sans-serif'
    }}>
      <h1>tiPRO Custom App</h1>
      <p>Status: <span style={{ color: '#8ab4f8' }}>{status}</span></p>
      
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <button 
          onClick={testAlert}
          style={btnStyle}
        >
          Test Alert
        </button>
        <button 
          onClick={testFS}
          style={btnStyle}
        >
          Test File System
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: '#8ab4f8', border: 'none', color: '#1a1b1e', padding: '10px 16px',
  borderRadius: 8, cursor: 'pointer', fontWeight: 600
};

export default App;
