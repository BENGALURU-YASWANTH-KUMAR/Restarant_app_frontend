import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverMsg, setServerMsg] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);
  
  if (loading) return <Loader />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setServerMsg('');
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.message === 'Login successful') {
        onLogin?.();
        navigate('/');
      } else {
        setServerMsg(response.data.message || 'Login failed');
      }
    } catch (error) {
      const data = error.response?.data;
      if (data?.errors) setFieldErrors(data.errors);
      setServerMsg(data?.message || data?.code || 'Error logging in');
    }
  };

  const gotoRegister = () => navigate('/Register');

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: 'linear-gradient(to right, #74ebd5, #acb6e5)' }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <h2 className="text-center mb-2 fw-bold" style={{ color: '#333' }}>Login</h2>
        <p className="text-center" style={{ color: '#666', fontSize: 13 }}>
          Use the email and password registered earlier.
        </p>

        {serverMsg && (
          <div className="alert alert-warning py-2" role="alert">
            {serverMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email" id="email" className={`form-control form-control-lg ${fieldErrors.email ? 'is-invalid' : ''}`}
              value={email} onChange={(e) => setEmail(e.target.value)} required style={{ borderRadius: '10px' }}
            />
            {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
          </div>
          <div className="mb-2 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"} 
              id="password" 
              className={`form-control form-control-lg ${fieldErrors.password ? 'is-invalid' : ''}`}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ borderRadius: '10px', paddingRight: '45px' }}
            />
            <button
              type="button"
              className="btn btn-sm position-absolute"
              style={{ right: '10px', top: '38px', backgroundColor: 'transparent', border: 'none' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
            </button>
            {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
          </div>
          <div className="d-flex justify-content-end mb-3">
            <Link to="/forgot-password" className="btn btn-link p-0" style={{ textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100" style={{ borderRadius: '10px' }}>
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don&apos;t have an account?{' '}
          <button onClick={gotoRegister} className="btn btn-link" style={{ textDecoration: 'none' }}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;