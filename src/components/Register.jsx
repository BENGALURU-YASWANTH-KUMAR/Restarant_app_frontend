import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])
  if (loading) return <Loader />

  const handleRegister = async (e) => {
    e.preventDefault()
    const fullName = e.target.fullName.value
    const username = e.target.username.value
    const email = e.target.email.value
    const phone = e.target.phone.value
    const address = e.target.address.value
    const password = e.target.password.value
    const confirmPassword = e.target.confirmPassword.value

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL
      const response = await axios.post(`${API_URL}/register`, {
        fullName, username, email, phone, address, password
      })
      alert(response.data.message || 'Registered successfully')
      navigate('/login')
    } catch (error) {
      alert(error.response?.data?.message || 'Error registering')
    }
  }

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div className="container my-5">
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="card shadow p-5"
            style={{
              maxWidth: '500px',
              width: '100%',
              borderRadius: '15px',
              backgroundColor: '#ffffff',
              border: 'none',
              boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
            }}
          >
            <h3 className="text-center mb-4" style={{ color: '#6a11cb', fontWeight: '600' }}>
              Register
            </h3>
            <form onSubmit={handleRegister}>
              {[
                { id: 'fullName', label: 'Full Name', type: 'text' },
                { id: 'username', label: 'Username', type: 'text' },
                { id: 'email', label: 'Email address', type: 'email' },
                { id: 'phone', label: 'Phone Number', type: 'tel' },
                { id: 'address', label: 'Address', type: 'text' },
                { id: 'password', label: 'Password', type: 'password' },
                { id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
              ].map(({ id, label, type }) => (
                <div className="mb-3" key={id}>
                  <label htmlFor={id} className="form-label" style={{ color: '#6a11cb' }}>
                    {label}
                  </label>
                  <input type={type} className="form-control" id={id} name={id} required style={{ borderRadius: '10px' }} />
                </div>
              ))}
              <button type="submit" className="btn w-100" style={{ borderRadius: '10px', backgroundColor: '#6a11cb', color: '#fff', fontWeight: '600' }}>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
