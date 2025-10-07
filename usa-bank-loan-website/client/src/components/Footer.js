import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-icon">🏦</span>
              USA Bank Loans
            </h3>
            <p>Your trusted partner for home, auto, and business financing solutions with competitive rates and personalized service.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/loan-services">Loan Services</a></li>
              <li><a href="/apply-now">Apply Now</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p className="contact-item">📞 +1-800-123-4567</p>
              <p className="contact-item">✉️ loans@usabank.com</p>
              <p className="contact-item">📍 123 Financial District, New York, NY 10001</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Business Hours</h4>
            <div className="business-hours">
              <p>Monday - Friday: 8:00 AM - 8:00 PM EST</p>
              <p>Saturday: 9:00 AM - 5:00 PM EST</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 USA Bank Loans. All rights reserved.</p>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/disclaimer">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;