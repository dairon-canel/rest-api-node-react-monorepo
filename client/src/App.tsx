import { useState, useEffect } from 'react';
import './App.css';
import GatewayList from './components/GatewayList';

function App() {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch('/api/v1', { headers: { Accept: 'application/json' } })
      .then(res => res.json())
      .then(data => setApiMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>Gateway Master</h1>
      <div className="card">
        <GatewayList />
      </div>
      <p>{apiMessage}</p>
    </div>
  );
}

export default App;
