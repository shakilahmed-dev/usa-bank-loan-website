
## 📁 **ফাইল ৩৮: client/src/utils/validation.js**
```javascript
/**
 * Frontend validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (US format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone number
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

/**
 * Validate SSN format
 * @param {string} ssn - SSN to validate
 * @returns {boolean} Is valid SSN format
 */
export const validateSSN = (ssn) => {
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
  return ssnRegex.test(ssn);
};

/**
 * Validate ZIP code format
 * @param {string} zipCode - ZIP code to validate
 * @returns {boolean} Is valid ZIP code
 */
export const validateZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

/**
 * Validate loan amount
 * @param {number} amount - Loan amount
 * @param {string} loanType - Type of loan
 * @returns {Object} Validation result
 */
export const validateLoanAmount = (amount, loanType) => {
  const minAmounts = {
    mortgage: 50000,
    auto: 5000,
    business: 10000,
    personal: 1000,
    student: 1000,
    'home-equity': 10000
  };

  const maxAmounts = {
    mortgage: 2000000,
    auto: 100000,
    business: 500000,
    personal: 50000,
    student: 150000,
    'home-equity': 500000
  };

  const min = minAmounts[loanType] || 1000;
  const max = maxAmounts[loanType] || 1000000;

  if (amount < min) {
    return {
      isValid: false,
      message: `Minimum loan amount for ${loanType} loan is $${min.toLocaleString()}`
    };
  }

  if (amount > max) {
    return {
      isValid: false,
      message: `Maximum loan amount for ${loanType} loan is $${max.toLocaleString()}`
    };
  }

  return { isValid: true };
};

/**
 * Validate date of birth (must be 18+ years old)
 * @param {string} dateString - Date string
 * @returns {Object} Validation result
 */
export const validateDateOfBirth = (dateString) => {
  const birthDate = new Date(dateString);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  const isAdult = age > 18 || (age === 18 && monthDiff >= 0);

  if (!isAdult) {
    return {
      isValid: false,
      message: 'You must be at least 18 years old to apply'
    };
  }

  if (age > 100) {
    return {
      isValid: false,
      message: 'Please enter a valid date of birth'
    };
  }

  return { isValid: true };
};

/**
 * Format phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }
  
  return phone;
};

/**
 * Format currency for display
 * @param {number} amount - Currency amount
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Calculate estimated monthly payment
 * @param {number} loanAmount - Loan amount
 * @param {number} interestRate - Annual interest rate (as decimal)
 * @param {number} loanTerm - Loan term in years
 * @returns {number} Estimated monthly payment
 */
export const calculateMonthlyPayment = (loanAmount, interestRate, loanTerm) => {
  const monthlyRate = interestRate / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }
  
  const payment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return payment;
};

/**
 * Check loan eligibility based on basic criteria
 * @param {Object} application - Application data
 * @returns {Object} Eligibility result
 */
export const checkBasicEligibility = (application) => {
  const { annualIncome, loanAmount, creditScore, loanType } = application;
  
  const eligibility = {
    eligible: true,
    reasons: [],
    suggestions: []
  };

  // Credit score check
  if (creditScore === 'poor') {
    eligibility.eligible = false;
    eligibility.reasons.push('Credit score below minimum requirement');
    eligibility.suggestions.push('Consider improving your credit score before applying');
  }

  // Debt-to-income ratio (simplified)
  const monthlyIncome = annualIncome / 12;
  const estimatedPayment = calculateMonthlyPayment(loanAmount, 0.05, 5); // 5% interest, 5-year term for estimation
  const dtiRatio = estimatedPayment / monthlyIncome;

  if (dtiRatio > 0.4) {
    eligibility.reasons.push('Debt-to-income ratio may be too high');
    eligibility.suggestions.push('Consider applying for a lower loan amount');
  }

  // Loan type specific checks
  const minIncomes = {
    mortgage: 50000,
    auto: 25000,
    business: 60000,
    'home-equity': 40000
  };

  if (minIncomes[loanType] && annualIncome < minIncomes[loanType]) {
    eligibility.reasons.push(`Income below recommended minimum for ${loanType} loan`);
    eligibility.suggestions.push('Consider a different loan type or provide additional income sources');
  }

  if (eligibility.reasons.length > 0) {
    eligibility.eligible = false;
  }

  return eligibility;
};

export default {
  validateEmail,
  validatePhone,
  validateSSN,
  validateZipCode,
  validateLoanAmount,
  validateDateOfBirth,
  formatPhoneNumber,
  formatCurrency,
  calculateMonthlyPayment,
  checkBasicEligibility
};