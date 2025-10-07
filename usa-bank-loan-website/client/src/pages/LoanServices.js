import React from 'react';
import { Link } from 'react-router-dom';
import './LoanServices.css';

const LoanServices = () => {
  const loanTypes = [
    {
      icon: '🏠',
      title: 'Mortgage Loans',
      description: 'Purchase or refinance your home with competitive rates and flexible terms tailored to your needs.',
      features: ['Fixed & Adjustable Rates', '15-30 Year Terms', 'Low Down Payments', 'Quick Approval Process'],
      rates: '3.5% - 5.5% APR',
      maxAmount: '$2,000,000'
    },
    {
      icon: '🚗',
      title: 'Auto Loans',
      description: 'Finance your new or used vehicle with great rates and fast approval process.',
      features: ['New & Used Vehicles', '2-7 Year Terms', 'Competitive Rates', 'Online Application'],
      rates: '4.0% - 6.5% APR',
      maxAmount: '$100,000'
    },
    {
      icon: '💼',
      title: 'Business Loans',
      description: 'Grow your business with our flexible financing options and expert financial guidance.',
      features: ['Working Capital', 'Equipment Financing', '1-10 Year Terms', 'Quick Funding'],
      rates: '5.0% - 8.0% APR',
      maxAmount: '$500,000'
    },
    {
      icon: '🎓',
      title: 'Student Loans',
      description: 'Invest in your education with student loan options featuring flexible repayment plans.',
      features: ['Undergraduate & Graduate', 'Deferred Payments', 'Fixed Low Rates', 'Flexible Terms'],
      rates: '4.5% - 7.0% APR',
      maxAmount: '$150,000'
    },
    {
      icon: '🏠',
      title: 'Home Equity Loans',
      description: 'Access the equity in your home for major expenses, renovations, or debt consolidation.',
      features: ['Fixed Rates', '5-30 Year Terms', 'Tax Benefits', 'Competitive Rates'],
      rates: '5.0% - 7.5% APR',
      maxAmount: '$500,000'
    },
    {
      icon: '⚡',
      title: 'Personal Loans',
      description: 'Get funds for personal expenses, debt consolidation, or unexpected costs with easy approval.',
      features: ['No Collateral', 'Fast Funding', 'Flexible Terms', 'Online Management'],
      rates: '6.0% - 12.0% APR',
      maxAmount: '$50,000'
    }
  ];

  return (
    <div className="loan-services">
      <div className="container">
        <div className="page-header">
          <h1>Our Loan Services</h1>
          <p>Explore our comprehensive range of loan products designed to meet your financial goals and needs</p>
        </div>

        <div className="loan-grid">
          {loanTypes.map((loan, index) => (
            <div key={index} className="loan-service-card">
              <div className="loan-header">
                <div className="loan-icon">{loan.icon}</div>
                <h3>{loan.title}</h3>
              </div>
              
              <p className="loan-description">{loan.description}</p>
              
              <div className="loan-details">
                <div className="loan-rate">
                  <span className="rate-label">Interest Rate</span>
                  <span className="rate-value">{loan.rates}</span>
                </div>
                <div className="loan-amount">
                  <span className="amount-label">Max Amount</span>
                  <span className="amount-value">{loan.maxAmount}</span>
                </div>
              </div>

              <div className="loan-features">
                <h4>Key Features:</h4>
                <ul>
                  {loan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <Link to="/apply-now" className="btn-primary full-width">
                Apply for {loan.title}
              </Link>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <div className="cta-content">
            <h2>Need Help Choosing the Right Loan?</h2>
            <p>Our experienced loan specialists are here to guide you through the process and help you select the perfect loan product for your unique situation.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">Get Free Consultation</Link>
              <a href="tel:+1-800-123-4567" className="btn-secondary">
                📞 Call Expert: +1-800-123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanServices;