import React from 'react';
import axios from 'axios';

const Register = () => {
  const handleRegister = async (event) => {
    event.preventDefault();
    const fullName = event.target.fullName.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const address = event.target.address.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        fullName,
        username,
        email,
        phone,
        address,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message || 'Error registering');
    }
  };

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient background for the page
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div className="container my-5">
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="card shadow p-5"
            style={{
              maxWidth: '500px',
              width: '100%',
              borderRadius: '15px',
              backgroundColor: '#ffffff', // Soft white background for the form card
              border: 'none',
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', // Subtle shadow effect for card
            }}
          >
            <h3 className="text-center mb-4" style={{ color: '#6a11cb', fontWeight: '600' }}>Register</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label" style={{ color: '#6a11cb' }}>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#6a11cb',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{ color: '#6a11cb' }}>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#6a11cb',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: '#6a11cb' }}>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#6a11cb',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label" style={{ color: '#6a11cb' }}>Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#6a11cb',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label" style={{ color: '#6a11cb' }}>Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#6a11cb',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ color: '#6a11cb' }}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#6a11cb',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label" style={{ color: '#6a11cb' }}>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#6a11cb',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn w-100"
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#6a11cb',
                  color: '#fff',
                  fontWeight: '600',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
