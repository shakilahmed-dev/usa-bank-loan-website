import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Your Dream Home & Business Financing Solution</h1>
              <p>Trusted by over 50,000 Americans with competitive rates and personalized service. Get the financial support you need with USA Bank Loans.</p>
              <div className="hero-buttons">
                <Link to="/apply-now" className="btn-primary">Get Pre-Approved</Link>
                <Link to="/loan-services" className="btn-secondary">Explore Loan Options</Link>
              </div>
              <div className="hero-features">
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>Fast Approval</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>Low Rates</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="stats-card">
                <h3>Why Choose USA Bank Loans?</h3>
                <div className="stats">
                  <div className="stat-item">
                    <span className="stat-number">4.2%</span>
                    <span className="stat-label">Average Rate</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">24h</span>
                    <span className="stat-label">Quick Approval</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50K+</span>
                    <span className="stat-label">Happy Customers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="loan-types">
        <div className="container">
          <h2>Our Loan Services</h2>
          <p className="section-subtitle">Choose from our comprehensive range of loan products designed to meet your financial goals</p>
          
          <div className="loan-cards">
            <div className="loan-card">
              <div className="loan-icon">🏠</div>
              <h3>Mortgage Loans</h3>
              <p>Purchase or refinance your home with competitive fixed and adjustable rate mortgages</p>
              <ul>
                <li>Loan amounts up to $2,000,000</li>
                <li>15, 20, 30 Year Terms Available</li>
                <li>Competitive 3.5% - 5.5% APR</li>
                <li>Low down payment options</li>
              </ul>
              <Link to="/apply-now" className="btn-primary">Apply Now</Link>
            </div>

            <div className="loan-card">
              <div className="loan-icon">🚗</div>
              <h3>Auto Loans</h3>
              <p>Finance your new or used vehicle with flexible terms and great rates</p>
              <ul>
                <li>Up to $100,000 financing</li>
                <li>2-7 Year Flexible Terms</li>
                <li>Low 4.0% - 6.5% APR</li>
                <li>Fast online approval</li>
              </ul>
              <Link to="/apply-now" className="btn-primary">Apply Now</Link>
            </div>

            <div className="loan-card">
              <div className="loan-icon">💼</div>
              <h3>Business Loans</h3>
              <p>Grow your business with our flexible financing options and expert support</p>
              <ul>
                <li>Up to $500,000 capital</li>
                <li>1-10 Year Business Terms</li>
                <li>5.0% - 8.0% APR</li>
                <li>Quick funding process</li>
              </ul>
              <Link to="/apply-now" className="btn-primary">Apply Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Contact our loan specialists today for personalized service and find the perfect loan solution for your needs</p>
            <div className="cta-buttons">
              <Link to="/apply-now" className="btn-primary">Apply Online Now</Link>
              <a href="tel:+1-800-123-4567" className="btn-secondary">
                📞 Call Now: +1-800-123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;