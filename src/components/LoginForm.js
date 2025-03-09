import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css';

const LoginForm = ({ setUser }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [userType, setUserType] = useState('Student');
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://3.6.229.61:9089/v1/check_profile', {
        mobile_number: mobileNumber,
      });
      if (response.data.status === 'success') {
        setUser(response.data.data[0]);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <img src="/assets/tee-scholar-logo.png" alt="Tee Scholar Logo" className="logo" />
      <h2>Log In as</h2>
      <div className="user-type-toggle">
        <button
          className={userType === 'Student' ? 'active' : ''}
          onClick={() => setUserType('Student')}
        >
          Student
        </button>
        <button
          className={userType === 'Parent' ? 'active' : ''}
          onClick={() => setUserType('Parent')}
        >
          Parent
        </button>
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Mobile Number</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="olivia@untitledui.com"
          />
        </div>
        <div className="remember-device">
          <input
            type="checkbox"
            checked={rememberDevice}
            onChange={(e) => setRememberDevice(e.target.checked)}
          />
          <label>Remember this device</label>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="help-text">
        Having trouble logging in? <button className="link-button">Get Help</button>
      </div>
      <div className="terms-text">
        By continuing you agree to our <button className="link-button">Terms of Services</button> and{' '}
        <button className="link-button">Privacy Policy</button>
      </div>
    </div>
  );
};

export default LoginForm;