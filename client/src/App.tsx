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
    <div>
      <h1>Gateway Master</h1>
      <GatewayList />
      <p>{apiMessage}</p>
    </div>
  );
}

export default App;
