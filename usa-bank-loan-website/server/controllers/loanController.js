const LoanApplication = require('../models/LoanApplication');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

// @desc    Create new loan application
// @route   POST /api/loans/apply
// @access  Public
const createLoanApplication = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    dateOfBirth,
    ssn,
    loanType,
    loanAmount,
    loanPurpose,
    employmentStatus,
    employerName,
    jobTitle,
    annualIncome,
    additionalIncome,
    creditScore,
    totalAssets,
    totalLiabilities,
    housingPayment,
    contactMethod,
    bestTime
  } = req.body;

  // Check for existing application with same email in last 24 hours
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const existingApplication = await LoanApplication.findOne({
    email,
    submittedAt: { $gte: twentyFourHoursAgo }
  });

  if (existingApplication) {
    return next(new AppError('You have already submitted an application in the last 24 hours. Please wait before submitting another.', 429));
  }

  // Create new application
  const loanApplication = new LoanApplication({
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    dateOfBirth,
    ssn,
    loanType,
    loanAmount,
    loanPurpose,
    employmentStatus,
    employerName,
    jobTitle,
    annualIncome,
    additionalIncome,
    creditScore,
    totalAssets,
    totalLiabilities,
    housingPayment,
    contactMethod,
    bestTime,
    ipAddress: req.ip
  });

  // Save to database
  await loanApplication.save();

  // Check basic eligibility (for demo purposes)
  const eligibility = loanApplication.checkBasicEligibility();

  // Prepare response data (exclude sensitive information)
  const responseData = {
    applicationId: loanApplication.applicationId,
    status: loanApplication.status,
    submittedAt: loanApplication.submittedAt,
    eligibility: eligibility,
    nextSteps: [
      'Application received and under review',
      'Loan specialist will contact you within 24 hours',
      'Have your financial documents ready for verification'
    ]
  };

  // In a real application, you would:
  // 1. Send confirmation email to applicant
  // 2. Send notification to loan officers
  // 3. Integrate with CRM system
  // 4. Initiate credit check process

  console.log(`📝 New loan application submitted: ${loanApplication.applicationId}`);
  console.log(`👤 Applicant: ${loanApplication.fullName}`);
  console.log(`💰 Loan Amount: $${loanApplication.loanAmount}`);
  console.log(`📧 Email: ${loanApplication.email}`);

  res.status(201).json({
    status: 'success',
    message: 'Loan application submitted successfully',
    data: responseData
  });
});

// @desc    Get application status
// @route   GET /api/loans/status/:applicationId
// @access  Public
const getApplicationStatus = asyncHandler(async (req, res, next) => {
  const { applicationId } = req.params;

  const application = await LoanApplication.findOne({ 
    applicationId: applicationId.toUpperCase() 
  }).select('-ssn -ipAddress -__v');

  if (!application) {
    return next(new AppError('Application not found', 404));
  }

  // Prepare status response
  const statusResponse = {
    applicationId: application.applicationId,
    fullName: application.fullName,
    loanType: application.loanType,
    loanAmount: application.loanAmount,
    status: application.status,
    submittedAt: application.submittedAt,
    updatedAt: application.updatedAt
  };

  // Add status-specific messages
  const statusMessages = {
    submitted: 'Your application has been received and is awaiting review.',
    under_review: 'Your application is currently being reviewed by our loan specialists.',
    approved: 'Congratulations! Your loan application has been approved.',
    rejected: 'We regret to inform you that your loan application was not approved.',
    additional_info_required: 'We need some additional information to process your application.'
  };

  statusResponse.message = statusMessages[application.status] || 'Application status updated.';
  statusResponse.nextAction = getNextAction(application.status);

  res.status(200).json({
    status: 'success',
    data: statusResponse
  });
});

// @desc    Get loan statistics (for admin dashboard)
// @route   GET /api/loans/statistics
// @access  Private (would be protected in real app)
const getLoanStatistics = asyncHandler(async (req, res, next) => {
  const totalApplications = await LoanApplication.countDocuments();
  const pendingApplications = await LoanApplication.countDocuments({ status: 'submitted' });
  const approvedApplications = await LoanApplication.countDocuments({ status: 'approved' });
  
  // Applications by type
  const applicationsByType = await LoanApplication.aggregate([
    {
      $group: {
        _id: '$loanType',
        count: { $sum: 1 }
      }
    }
  ]);

  // Recent applications (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentApplications = await LoanApplication.countDocuments({
    submittedAt: { $gte: sevenDaysAgo }
  });

  const statistics = {
    total: totalApplications,
    pending: pendingApplications,
    approved: approvedApplications,
    recent: recentApplications,
    byType: applicationsByType.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {}),
    approvalRate: totalApplications > 0 ? (approvedApplications / totalApplications * 100).toFixed(1) : 0
  };

  res.status(200).json({
    status: 'success',
    data: statistics
  });
});

// @desc    Get all applications (admin function)
// @route   GET /api/loans/applications
// @access  Private
const getAllApplications = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, status, loanType } = req.query;

  // Build filter object
  const filter = {};
  if (status) filter.status = status;
  if (loanType) filter.loanType = loanType;

  const applications = await LoanApplication.find(filter)
    .select('-ssn -ipAddress -__v')
    .sort({ submittedAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await LoanApplication.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    data: {
      applications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalApplications: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    }
  });
});

// Helper function to determine next action based on status
function getNextAction(status) {
  const actions = {
    submitted: 'Wait for initial contact from our loan specialist',
    under_review: 'Prepare necessary documents for verification',
    approved: 'Review and sign loan agreement documents',
    rejected: 'Contact us to discuss other financing options',
    additional_info_required: 'Provide the requested additional information'
  };

  return actions[status] || 'Wait for further instructions';
}

module.exports = {
  createLoanApplication,
  getApplicationStatus,
  getLoanStatistics,
  getAllApplications
};