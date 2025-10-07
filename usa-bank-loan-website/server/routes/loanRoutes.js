const express = require('express');
const {
  createLoanApplication,
  getApplicationStatus,
  getLoanStatistics,
  getAllApplications
} = require('../controllers/loanController');
const {
  validateLoanApplication,
  handleValidationErrors,
  sanitizeData
} = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/loans/apply
// @desc    Submit new loan application
// @access  Public
router.post(
  '/apply',
  sanitizeData,
  validateLoanApplication,
  handleValidationErrors,
  createLoanApplication
);

// @route   GET /api/loans/status/:applicationId
// @desc    Get application status by application ID
// @access  Public
router.get('/status/:applicationId', getApplicationStatus);

// @route   GET /api/loans/statistics
// @desc    Get loan application statistics (admin)
// @access  Private (add authentication middleware in production)
router.get('/statistics', getLoanStatistics);

// @route   GET /api/loans/applications
// @desc    Get all loan applications (admin)
// @access  Private (add authentication middleware in production)
router.get('/applications', getAllApplications);

// @route   GET /api/loans/types
// @desc    Get available loan types and their details
// @access  Public
router.get('/types', (req, res) => {
  const loanTypes = [
    {
      type: 'mortgage',
      name: 'Mortgage Loan',
      description: 'Purchase or refinance your home with competitive rates',
      minAmount: 50000,
      maxAmount: 2000000,
      minTerm: 15,
      maxTerm: 30,
      interestRate: '3.5% - 5.5% APR',
      features: [
        'Fixed & Adjustable Rates',
        '15-30 Year Terms',
        'Low Down Payments',
        'Quick Approval Process'
      ]
    },
    {
      type: 'auto',
      name: 'Auto Loan',
      description: 'Finance your new or used vehicle with great rates',
      minAmount: 5000,
      maxAmount: 100000,
      minTerm: 2,
      maxTerm: 7,
      interestRate: '4.0% - 6.5% APR',
      features: [
        'New & Used Vehicles',
        '2-7 Year Terms',
        'Competitive Rates',
        'Online Application'
      ]
    },
    {
      type: 'business',
      name: 'Business Loan',
      description: 'Grow your business with our flexible financing options',
      minAmount: 10000,
      maxAmount: 500000,
      minTerm: 1,
      maxTerm: 10,
      interestRate: '5.0% - 8.0% APR',
      features: [
        'Working Capital',
        'Equipment Financing',
        '1-10 Year Terms',
        'Quick Funding'
      ]
    },
    {
      type: 'personal',
      name: 'Personal Loan',
      description: 'Get funds for personal expenses with easy approval',
      minAmount: 1000,
      maxAmount: 50000,
      minTerm: 1,
      maxTerm: 5,
      interestRate: '6.0% - 12.0% APR',
      features: [
        'No Collateral Required',
        'Fast Funding',
        'Flexible Terms',
        'Online Management'
      ]
    },
    {
      type: 'student',
      name: 'Student Loan',
      description: 'Invest in your education with flexible repayment options',
      minAmount: 1000,
      maxAmount: 150000,
      minTerm: 5,
      maxTerm: 15,
      interestRate: '4.5% - 7.0% APR',
      features: [
        'Undergraduate & Graduate',
        'Deferred Payments',
        'Fixed Low Rates',
        'Flexible Terms'
      ]
    },
    {
      type: 'home-equity',
      name: 'Home Equity Loan',
      description: 'Access the equity in your home for major expenses',
      minAmount: 10000,
      maxAmount: 500000,
      minTerm: 5,
      maxTerm: 30,
      interestRate: '5.0% - 7.5% APR',
      features: [
        'Fixed Rates',
        '5-30 Year Terms',
        'Tax Benefits',
        'Competitive Rates'
      ]
    }
  ];

  res.status(200).json({
    status: 'success',
    data: loanTypes
  });
});

// @route   GET /api/loans/eligibility
// @desc    Check basic loan eligibility
// @access  Public
router.get('/eligibility', (req, res) => {
  const { loanType, creditScore, annualIncome, loanAmount } = req.query;

  // Basic eligibility check (simplified for demo)
  let eligible = true;
  let reasons = [];
  let suggestions = [];

  // Credit score check
  if (creditScore === 'poor') {
    eligible = false;
    reasons.push('Credit score below minimum requirement');
    suggestions.push('Consider improving your credit score before applying');
  }

  // Income verification (simplified)
  const minIncome = {
    mortgage: 50000,
    auto: 25000,
    business: 60000,
    personal: 20000,
    student: 0,
    'home-equity': 40000
  };

  if (annualIncome && loanType && minIncome[loanType]) {
    if (parseInt(annualIncome) < minIncome[loanType]) {
      reasons.push(`Annual income below recommended minimum for ${loanType} loan`);
      suggestions.push('Consider applying for a different loan type or lower amount');
    }
  }

  // Loan amount sanity check
  if (loanAmount && annualIncome) {
    const recommendedMax = parseInt(annualIncome) * 0.5; // 50% of annual income
    if (parseInt(loanAmount) > recommendedMax) {
      reasons.push('Loan amount may be too high for your income level');
      suggestions.push('Consider applying for a lower loan amount');
    }
  }

  if (reasons.length > 0) {
    eligible = false;
  }

  res.status(200).json({
    status: 'success',
    data: {
      eligible,
      reasons,
      suggestions,
      disclaimer: 'This is a basic eligibility check. Final approval is subject to full application review.'
    }
  });
});

module.exports = router;