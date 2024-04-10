// signup.js
import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', { username, email, password });
      console.log(response.data);

      Cookies.set('userData', { username, email });

      window.location.href = '/';
    } catch (error) {
        window.location.href = '/';
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='signup-page'>
        <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <label htmlFor="username">Username:</label>
          <input type="username" id="username" value={username} onChange={handleUsernameChange} required />
        </div>
        <div className='input-box'>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className='input-box'>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button className="signup-btn"type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
    </div>
  );
}

export default Signup;
