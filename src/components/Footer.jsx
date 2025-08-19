// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 pt-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5 className="mb-3">SmartBite</h5>
            <p className="mb-2">Delicious meals, smart choices.</p>
            <p className="small text-secondary">
              © {new Date().getFullYear()} SmartBite. All rights reserved.
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link className="text-decoration-none text-light" to="/">Home</Link></li>
              <li><Link className="text-decoration-none text-light" to="/about">About</Link></li>
              <li><Link className="text-decoration-none text-light" to="/favourite">My Favourite</Link></li>
              <li><Link className="text-decoration-none text-light" to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="mb-3">Follow Us</h6>
            <div className="d-flex gap-3 fs-4">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-youtube"></i>
            </div>
          </div>
        </div>
        <hr className="border-secondary mt-4" />
        <div className="text-center pb-3 small text-secondary">
          Built with ❤️ using React & Bootstrap.
        </div>
      </div>
    </footer>
  )
}

export default Footer
