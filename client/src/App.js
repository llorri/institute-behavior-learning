import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('Loading...');

  useEffect(() => {
    let isMounted = true;

    async function checkHealth() {
      try {
        const response = await fetch('/api/health');
        if (!response.ok) {
          throw new Error(`Health check failed: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setApiStatus(data?.status || 'OK');
        }
      } catch (err) {
        if (isMounted) {
          setApiStatus('Unavailable');
        }
      }
    }

    checkHealth();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏥 Institute for Behavior and Learning</h1>
        <h2>✅ Successfully Deployed!</h2>
        <p>Your website is now live on the internet!</p>
        <p>API Status: <span id="api-status">{apiStatus}</span></p>
      </header>
    </div>
  );
}

export default App;
