const { body, validationResult } = require('express-validator');

// Validation for loan application
const validateLoanApplication = [
  // Personal Information
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please enter a valid phone number'),
  
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Please enter a valid date')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        throw new Error('You must be at least 18 years old');
      }
      if (age > 100) {
        throw new Error('Please enter a valid date of birth');
      }
      return true;
    }),
  
  body('ssn')
    .trim()
    .notEmpty()
    .withMessage('SSN is required')
    .matches(/^\d{3}-\d{2}-\d{4}$/)
    .withMessage('SSN must be in format XXX-XX-XXXX'),
  
  // Loan Information
  body('loanType')
    .isIn(['mortgage', 'auto', 'personal', 'business', 'student', 'home-equity'])
    .withMessage('Invalid loan type'),
  
  body('loanAmount')
    .isFloat({ min: 1000, max: 1000000 })
    .withMessage('Loan amount must be between $1,000 and $1,000,000'),
  
  body('annualIncome')
    .isFloat({ min: 0 })
    .withMessage('Annual income must be a positive number'),
  
  body('employmentStatus')
    .isIn(['employed', 'self-employed', 'retired', 'unemployed', 'student', 'military'])
    .withMessage('Invalid employment status'),
  
  // Financial Information
  body('creditScore')
    .optional()
    .isIn(['excellent', 'good', 'fair', 'poor', ''])
    .withMessage('Invalid credit score range'),
  
  body('totalAssets')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total assets must be a positive number'),
  
  body('totalLiabilities')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total liabilities must be a positive number'),
  
  // Contact Preference
  body('contactMethod')
    .isIn(['phone', 'email', 'text'])
    .withMessage('Invalid contact method'),
  
  body('bestTime')
    .isIn(['morning', 'afternoon', 'evening'])
    .withMessage('Invalid contact time'),
  
  body('agreeTerms')
    .equals('true')
    .withMessage('You must agree to the terms and conditions')
];

// Validation for contact form
const validateContactForm = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('subject')
    .isIn(['mortgage', 'auto', 'business', 'personal', 'student', 'general', 'other'])
    .withMessage('Invalid subject'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg
    }));
    
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errorMessages
    });
  }
  
  next();
};

// Sanitization middleware
const sanitizeData = [
  body('*').escape(), // Basic HTML escaping
  body('email').normalizeEmail(),
  body('firstName').trim().escape(),
  body('lastName').trim().escape(),
  body('address').trim().escape(),
  body('city').trim().escape(),
  body('employerName').trim().escape(),
  body('jobTitle').trim().escape(),
  body('loanPurpose').trim().escape()
];

module.exports = {
  validateLoanApplication,
  validateContactForm,
  handleValidationErrors,
  sanitizeData
};