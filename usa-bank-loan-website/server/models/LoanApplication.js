const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true,
    uppercase: true,
    maxlength: 2
  },
  zipCode: {
    type: String,
    trim: true,
    match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  ssn: {
    type: String,
    required: [true, 'SSN is required'],
    trim: true
  },
  
  // Loan Information
  loanType: {
    type: String,
    required: [true, 'Loan type is required'],
    enum: {
      values: ['mortgage', 'auto', 'personal', 'business', 'student', 'home-equity'],
      message: 'Invalid loan type'
    }
  },
  loanAmount: {
    type: Number,
    required: [true, 'Loan amount is required'],
    min: [1000, 'Loan amount must be at least $1,000'],
    max: [1000000, 'Loan amount cannot exceed $1,000,000']
  },
  loanPurpose: {
    type: String,
    trim: true
  },
  employmentStatus: {
    type: String,
    required: [true, 'Employment status is required'],
    enum: {
      values: ['employed', 'self-employed', 'retired', 'unemployed', 'student', 'military'],
      message: 'Invalid employment status'
    }
  },
  employerName: {
    type: String,
    trim: true
  },
  jobTitle: {
    type: String,
    trim: true
  },
  annualIncome: {
    type: Number,
    required: [true, 'Annual income is required'],
    min: [0, 'Annual income cannot be negative']
  },
  additionalIncome: {
    type: Number,
    default: 0,
    min: [0, 'Additional income cannot be negative']
  },
  
  // Financial Information
  creditScore: {
    type: String,
    enum: {
      values: ['excellent', 'good', 'fair', 'poor', ''],
      message: 'Invalid credit score range'
    }
  },
  totalAssets: {
    type: Number,
    min: [0, 'Total assets cannot be negative']
  },
  totalLiabilities: {
    type: Number,
    min: [0, 'Total liabilities cannot be negative']
  },
  housingPayment: {
    type: Number,
    min: [0, 'Housing payment cannot be negative']
  },
  
  // Contact Preference
  contactMethod: {
    type: String,
    required: [true, 'Contact method is required'],
    enum: {
      values: ['phone', 'email', 'text'],
      message: 'Invalid contact method'
    }
  },
  bestTime: {
    type: String,
    required: [true, 'Best time to contact is required'],
    enum: {
      values: ['morning', 'afternoon', 'evening'],
      message: 'Invalid contact time'
    }
  },
  
  // Application Metadata
  status: {
    type: String,
    enum: {
      values: ['submitted', 'under_review', 'approved', 'rejected', 'additional_info_required'],
      message: 'Invalid application status'
    },
    default: 'submitted'
  },
  applicationId: {
    type: String,
    unique: true,
    required: true
  },
  ipAddress: {
    type: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
loanApplicationSchema.index({ applicationId: 1 });
loanApplicationSchema.index({ email: 1 });
loanApplicationSchema.index({ status: 1 });
loanApplicationSchema.index({ submittedAt: -1 });

// Pre-save middleware to generate application ID and update timestamp
loanApplicationSchema.pre('save', function(next) {
  if (this.isNew) {
    this.applicationId = generateApplicationId();
  }
  this.updatedAt = Date.now();
  next();
});

// Generate unique application ID
function generateApplicationId() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `APP${timestamp.slice(-8)}${random}`;
}

// Virtual for full name
loanApplicationSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Instance method to check eligibility (basic demo version)
loanApplicationSchema.methods.checkBasicEligibility = function() {
  const { annualIncome, loanAmount, creditScore } = this;
  
  const eligibility = {
    eligible: true,
    reasons: [],
    suggestions: []
  };

  // Basic credit score check
  if (creditScore === 'poor') {
    eligibility.eligible = false;
    eligibility.reasons.push('Credit score below minimum requirement');
  }

  // Debt-to-income ratio check (simplified)
  const monthlyIncome = annualIncome / 12;
  const maxRecommendedPayment = monthlyIncome * 0.35; // 35% DTI ratio
  const estimatedMonthlyPayment = loanAmount * 0.006; // Rough estimate

  if (estimatedMonthlyPayment > maxRecommendedPayment) {
    eligibility.reasons.push('Loan amount may be too high for your income');
    eligibility.suggestions.push('Consider applying for a lower loan amount');
  }

  if (eligibility.reasons.length > 0) {
    eligibility.eligible = false;
  }

  return eligibility;
};

// Static method to get applications by status
loanApplicationSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ submittedAt: -1 });
};

// Static method to get recent applications
loanApplicationSchema.statics.getRecent = function(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return this.find({ submittedAt: { $gte: date } }).sort({ submittedAt: -1 });
};

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

module.exports = LoanApplication;