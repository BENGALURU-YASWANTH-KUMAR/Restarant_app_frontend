// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center p-4 w-100" style={{ backgroundColor: '#343a40', color: '#f8f9fa' }}>
      <p>&copy; 2024 SmartBite | All Rights Reserved</p>
      <p>
        <a href="/contact" style={{ textDecoration: 'none', color: '#f8f9fa' }}>Contact Us</a> |{' '}
        <a href="/privacy" style={{ textDecoration: 'none', color: '#f8f9fa' }}>Privacy Policy</a>
      </p>
      <p>Follow us on:
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2" style={{ color: '#f8f9fa' }}>
          Facebook
        </a>
        |
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2" style={{ color: '#f8f9fa' }}>
          Instagram
        </a>
        |
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2" style={{ color: '#f8f9fa' }}>
          Twitter
        </a>
      </p>
    </footer>
  );
};

export default Footer;
