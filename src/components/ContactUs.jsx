import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/contact', formData);
      setFormStatus(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus(error.response?.data?.message || 'Error sending message');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Soft peach gradient for the page background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-md-6 card p-5 shadow-lg"
            style={{
              backgroundColor: '#ffffff', // White background for the form card
              borderRadius: '15px',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            }}
          >
            <h2 className="text-center mb-4" style={{ color: '#ff7e5f' }}>Contact Us</h2>

            {formStatus && (
              <div className="alert alert-info text-center">
                {formStatus}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#ff7e5f',
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#ff7e5f',
                  }}
                />
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Your message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: '10px',
                    borderColor: '#ff7e5f',
                  }}
                ></textarea>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: '#ff7e5f',
                    color: '#fff',
                    fontWeight: '600',
                    borderRadius: '10px',
                  }}
                >
                  Send a message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
