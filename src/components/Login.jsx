import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Go to register page
  const handleSignUp = () => {
    navigate('/register');
  };

  // Login function
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // ✅ use import.meta.env for Vite
      const API_URL = import.meta.env.VITE_API_URL;  
      const response = await axios.post(`${API_URL}/login`, { email, password });

      if (response.data.message === 'Login successful') {
        onLogin(); // Update state in parent
        navigate('/'); // Go to home
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: 'linear-gradient(to right, #74ebd5, #acb6e5)', fontFamily: 'Arial, sans-serif' }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#333' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: '10px' }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            style={{ backgroundColor: '#4CAF50', borderRadius: '10px' }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <button
            onClick={handleSignUp}
            className="btn btn-link"
            style={{ textDecoration: 'none', color: '#007BFF' }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
