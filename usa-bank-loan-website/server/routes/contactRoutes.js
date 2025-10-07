const express = require('express');
const {
  submitContactForm,
  getAllContactMessages,
  getContactStatistics,
  updateMessageStatus
} = require('../controllers/contactController');
const {
  validateContactForm,
  handleValidationErrors,
  sanitizeData
} = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post(
  '/',
  sanitizeData,
  validateContactForm,
  handleValidationErrors,
  submitContactForm
);

// @route   GET /api/contact/messages
// @desc    Get all contact messages (admin)
// @access  Private
router.get('/messages', getAllContactMessages);

// @route   GET /api/contact/statistics
// @desc    Get contact statistics (admin)
// @access  Private
router.get('/statistics', getContactStatistics);

// @route   PATCH /api/contact/messages/:id/status
// @desc    Update message status (admin)
// @access  Private
router.patch('/messages/:id/status', updateMessageStatus);

// @route   GET /api/contact/info
// @desc    Get contact information
// @access  Public
router.get('/info', (req, res) => {
  const contactInfo = {
    phone: '+1-800-123-4567',
    email: 'loans@usabank.com',
    address: {
      street: '123 Financial District',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    businessHours: {
      weekdays: {
        days: 'Monday - Friday',
        hours: '8:00 AM - 8:00 PM EST'
      },
      saturday: {
        days: 'Saturday',
        hours: '9:00 AM - 5:00 PM EST'
      },
      sunday: {
        days: 'Sunday',
        hours: 'Closed'
      }
    },
    departments: [
      {
        name: 'Loan Applications',
        phone: '+1-800-123-4567',
        email: 'applications@usabank.com'
      },
      {
        name: 'Customer Support',
        phone: '+1-800-123-4568',
        email: 'support@usabank.com'
      },
      {
        name: 'Existing Loans',
        phone: '+1-800-123-4569',
        email: 'loanservice@usabank.com'
      }
    ]
  };

  res.status(200).json({
    status: 'success',
    data: contactInfo
  });
});

module.exports = router;