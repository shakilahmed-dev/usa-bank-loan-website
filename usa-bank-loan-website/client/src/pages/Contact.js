import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'phone'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      alert('Thank you for your message! We will contact you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactMethod: 'phone'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Our Loan Specialists</h1>
          <p>Get personalized assistance and expert guidance for all your loan needs</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p className="contact-intro">Our team of loan specialists is ready to help you find the perfect financing solution. Choose your preferred method of contact.</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Call Us Directly</h3>
                  <p className="contact-number">+1-800-123-4567</p>
                  <span className="contact-hours">Mon-Fri: 8:00 AM - 8:00 PM EST</span>
                  <span className="contact-hours">Saturday: 9:00 AM - 5:00 PM EST</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h3>Email Us</h3>
                  <p className="contact-email">loans@usabank.com</p>
                  <span className="contact-response">Response within 24 hours</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">🏢</div>
                <div className="contact-details">
                  <h3>Visit Our Office</h3>
                  <p>123 Financial District</p>
                  <p>New York, NY 10001</p>
                  <span className="contact-hours">By appointment only</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">💬</div>
                <div className="contact-details">
                  <h3>Live Chat</h3>
                  <p>Available during business hours</p>
                  <span className="contact-hours">Click the chat icon below</span>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="mortgage">Mortgage Loan Inquiry</option>
                <option value="auto">Auto Loan Inquiry</option>
                <option value="business">Business Loan Inquiry</option>
                <option value="personal">Personal Loan Inquiry</option>
                <option value="student">Student Loan Inquiry</option>
                <option value="general">General Information</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contactMethod">Preferred Contact Method</label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
              >
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
                <option value="text">Text Message</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Please describe your loan needs or questions..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-primary full-width"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>

            <p className="form-note">
              We respect your privacy and will never share your information with third parties.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;