import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? <LoginForm setUser={setUser} /> : <Dashboard user={user} />}
    </div>
  );
}

export default App;