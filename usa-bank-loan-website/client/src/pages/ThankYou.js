import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const location = useLocation();
  const [applicationData, setApplicationData] = useState(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (location.state) {
      setApplicationData(location.state);
    }

    // Countdown for automatic redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to home page
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.state]);

  if (!applicationData) {
    return (
      <div className="thank-you-page">
        <div className="container">
          <div className="thank-you-content">
            <h1>Application Submitted</h1>
            <p>Thank you for your loan application!</p>
            <Link to="/" className="btn-primary">Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const { applicationId, name, email } = applicationData;

  return (
    <div className="thank-you-page">
      <div className="container">
        <div className="thank-you-content">
          <div className="success-animation">
            <div className="success-icon">✓</div>
          </div>
          
          <h1>Thank You, {name}!</h1>
          <p className="subtitle">Your loan application has been successfully submitted</p>

          <div className="application-details">
            <div className="detail-card">
              <h3>Application Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Application ID:</span>
                  <span className="detail-value">{applicationId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Full Name:</span>
                  <span className="detail-value">{name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Submission Date:</span>
                  <span className="detail-value">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value status-pending">Under Review</span>
                </div>
              </div>
            </div>
          </div>

          <div className="next-steps">
            <h3>What Happens Next?</h3>
            <div className="steps-timeline">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Application Review</h4>
                  <p>Our loan specialists will review your application within 24 hours</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Initial Contact</h4>
                  <p>We'll contact you via your preferred method to discuss next steps</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Documentation</h4>
                  <p>You may be asked to provide additional documents for verification</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Final Decision</h4>
                  <p>Receive your loan decision and funding details</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-reminder">
            <div className="reminder-content">
              <h3>Need Immediate Assistance?</h3>
              <p>Our loan specialists are available to answer your questions</p>
              <div className="contact-options">
                <a href="tel:+1-800-123-4567" className="contact-option">
                  <span className="option-icon">📞</span>
                  <span>Call: +1-800-123-4567</span>
                </a>
                <a href="mailto:loans@usabank.com" className="contact-option">
                  <span className="option-icon">✉️</span>
                  <span>Email: loans@usabank.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/" className="btn-primary">
              Return to Homepage
            </Link>
            <Link to="/loan-services" className="btn-secondary">
              Explore Other Loans
            </Link>
          </div>

          <div className="redirect-notice">
            <p>You will be automatically redirected to the homepage in <strong>{countdown}</strong> seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;