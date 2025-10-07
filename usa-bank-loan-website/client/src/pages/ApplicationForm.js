import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationForm.css';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    ssn: '',
    
    // Step 2: Loan Information
    loanType: 'mortgage',
    loanAmount: '',
    loanPurpose: '',
    employmentStatus: '',
    employerName: '',
    jobTitle: '',
    annualIncome: '',
    additionalIncome: '',
    
    // Step 3: Financial Information
    creditScore: '',
    totalAssets: '',
    totalLiabilities: '',
    housingPayment: '',
    
    // Step 4: Contact Preference
    contactMethod: 'phone',
    bestTime: 'morning',
    agreeTerms: false,
    agreeMarketing: false
  });

  const [errors, setErrors] = useState({});

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.ssn.trim()) newErrors.ssn = 'SSN is required';
    }

    if (step === 2) {
      if (!formData.loanAmount || formData.loanAmount < 1000) newErrors.loanAmount = 'Valid loan amount is required (min: $1,000)';
      if (!formData.annualIncome || formData.annualIncome < 0) newErrors.annualIncome = 'Annual income is required';
      if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
    }

    if (step === 3) {
      if (!formData.creditScore) newErrors.creditScore = 'Credit score range is required';
    }

    if (step === 4) {
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const applicationId = `APP${Date.now()}`;
        navigate('/thank-you', { 
          state: { 
            applicationId: applicationId,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email
          } 
        });
        setIsSubmitting(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const progressPercentage = ((currentStep - 1) / 3) * 100;

  return (
    <div className="application-form-page">
      <div className="container">
        <div className="form-header">
          <h1>Loan Application</h1>
          <p>Complete your application in just a few simple steps</p>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="progress-steps">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                <span>1</span>
                Personal Info
              </div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                <span>2</span>
                Loan Details
              </div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                <span>3</span>
                Financial Info
              </div>
              <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
                <span>4</span>
                Review & Submit
              </div>
            </div>
          </div>
        </div>

        <div className="form-content">
          <form onSubmit={handleSubmit} className="loan-application-form">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="form-step">
                <h2>Personal Information</h2>
                <p className="step-description">Please provide your basic personal details</p>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <select name="state" value={formData.state} onChange={handleChange}>
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      maxLength="5"
                    />
                  </div>

                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={errors.dateOfBirth ? 'error' : ''}
                    />
                    {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                  </div>

                  <div className="form-group">
                    <label>Social Security Number *</label>
                    <input
                      type="text"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleChange}
                      className={errors.ssn ? 'error' : ''}
                      placeholder="XXX-XX-XXXX"
                      maxLength="11"
                    />
                    {errors.ssn && <span className="error-message">{errors.ssn}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Loan Details - Next file-এ continue করব */}
            {currentStep === 2 && (
              <div className="form-step">
                <h2>Loan Details</h2>
                <p className="step-description">Tell us about the loan you're looking for</p>
                
                <div className="form-group">
                  <label>Loan Type *</label>
                  <select name="loanType" value={formData.loanType} onChange={handleChange}>
                    <option value="mortgage">Mortgage Loan</option>
                    <option value="auto">Auto Loan</option>
                    <option value="personal">Personal Loan</option>
                    <option value="business">Business Loan</option>
                    <option value="student">Student Loan</option>
                    <option value="home-equity">Home Equity Loan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Loan Amount ($) *</label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    className={errors.loanAmount ? 'error' : ''}
                    min="1000"
                    max="1000000"
                    step="1000"
                  />
                  {errors.loanAmount && <span className="error-message">{errors.loanAmount}</span>}
                </div>

                <div className="form-group">
                  <label>Loan Purpose</label>
                  <input
                    type="text"
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    placeholder="e.g., Home purchase, car financing, debt consolidation"
                  />
                </div>

                <div className="form-group">
                  <label>Employment Status *</label>
                  <select 
                    name="employmentStatus" 
                    value={formData.employmentStatus} 
                    onChange={handleChange}
                    className={errors.employmentStatus ? 'error' : ''}
                  >
                    <option value="">Select Employment Status</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="retired">Retired</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="student">Student</option>
                    <option value="military">Military</option>
                  </select>
                  {errors.employmentStatus && <span className="error-message">{errors.employmentStatus}</span>}
                </div>

                {formData.employmentStatus === 'employed' || formData.employmentStatus === 'self-employed' ? (
                  <>
                    <div className="form-group">
                      <label>Employer Name</label>
                      <input
                        type="text"
                        name="employerName"
                        value={formData.employerName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                ) : null}

                <div className="form-group">
                  <label>Annual Income ($) *</label>
                  <input
                    type="number"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    className={errors.annualIncome ? 'error' : ''}
                    min="0"
                    step="1000"
                  />
                  {errors.annualIncome && <span className="error-message">{errors.annualIncome}</span>}
                </div>

                <div className="form-group">
                  <label>Additional Income ($)</label>
                  <input
                    type="number"
                    name="additionalIncome"
                    value={formData.additionalIncome}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                  />
                  <span className="input-note">Include bonuses, investments, rental income, etc.</span>
                </div>
              </div>
            )}

            <div className="form-navigation">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={handlePrevious}
                >
                  ← Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button 
                  type="button" 
                  className="btn-primary"
                  onClick={handleNext}
                >
                  Next →
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>

          <div className="form-sidebar">
            <div className="sidebar-card">
              <h3>Need Help?</h3>
              <p>Our loan specialists are here to assist you</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>Call Us</strong>
                    <p>+1-800-123-4567</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <span className="contact-icon">✉️</span>
                  <div>
                    <strong>Email Us</strong>
                    <p>loans@usabank.com</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <span className="contact-icon">🕒</span>
                  <div>
                    <strong>Business Hours</strong>
                    <p>Mon-Fri: 8AM-8PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Application Tips</h3>
              <ul className="tips-list">
                <li>✓ Have your financial documents ready</li>
                <li>✓ Be accurate with your information</li>
                <li>✓ Check your credit score beforehand</li>
                <li>✓ We'll contact you within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;