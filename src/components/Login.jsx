import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const Login = ({ onLogin }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])
  if (loading) return <Loader />

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const API_URL = import.meta.env.VITE_API_URL
      const response = await axios.post(`${API_URL}/login`, { email, password })
      if (response.data.message === 'Login successful') {
        onLogin?.()
        navigate('/')
      } else {
        alert(response.data.message || 'Login failed')
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error logging in')
    }
  }

  const gotoRegister = () => navigate('/register')

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: 'linear-gradient(to right, #74ebd5, #acb6e5)' }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 fw-bold" style={{ color: '#333' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email" id="email" className="form-control form-control-lg"
              value={email} onChange={(e) => setEmail(e.target.value)} required style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password" id="password" className="form-control form-control-lg"
              value={password} onChange={(e) => setPassword(e.target.value)} required style={{ borderRadius: '10px' }}
            />
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
  )
}

export default Login
