import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import StudyPage from './components/StudyPage'; // Create this new component
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={!user ? <LoginForm setUser={setUser} /> : <Dashboard user={user} />} />
          <Route path="/study" element={<StudyPage user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;