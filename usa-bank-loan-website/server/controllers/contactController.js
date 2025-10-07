const ContactMessage = require('../models/ContactMessage');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    subject,
    message,
    contactMethod
  } = req.body;

  // Check for spam/duplicate submissions (same message in last hour)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recentMessage = await ContactMessage.findOne({
    email,
    message,
    submittedAt: { $gte: oneHourAgo }
  });

  if (recentMessage) {
    return next(new AppError('Duplicate message detected. Please wait before submitting another message.', 429));
  }

  // Create new contact message
  const contactMessage = new ContactMessage({
    name,
    email,
    phone,
    subject,
    message,
    contactMethod,
    ipAddress: req.ip
  });

  // Save to database
  await contactMessage.save();

  // In a real application, you would:
  // 1. Send confirmation email to the user
  // 2. Send notification to the support team
  // 3. Create a ticket in your support system

  console.log(`📧 New contact message received from: ${name}`);
  console.log(`📬 Subject: ${subject}`);
  console.log(`📧 Email: ${email}`);

  res.status(201).json({
    status: 'success',
    message: 'Thank you for your message! We will get back to you within 24 hours.',
    data: {
      messageId: contactMessage._id,
      submittedAt: contactMessage.submittedAt,
      expectedResponse: 'within 24 hours'
    }
  });
});

// @desc    Get all contact messages (admin)
// @route   GET /api/contact/messages
// @access  Private
const getAllContactMessages = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, status, subject } = req.query;

  // Build filter object
  const filter = {};
  if (status) filter.status = status;
  if (subject) filter.subject = subject;

  const messages = await ContactMessage.find(filter)
    .sort({ submittedAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-ipAddress -__v');

  const total = await ContactMessage.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    data: {
      messages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalMessages: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    }
  });
});

// @desc    Get contact statistics
// @route   GET /api/contact/statistics
// @access  Private
const getContactStatistics = asyncHandler(async (req, res, next) => {
  const totalMessages = await ContactMessage.countDocuments();
  const newMessages = await ContactMessage.countDocuments({ status: 'new' });
  
  // Messages by subject
  const messagesBySubject = await ContactMessage.aggregate([
    {
      $group: {
        _id: '$subject',
        count: { $sum: 1 }
      }
    }
  ]);

  // Recent messages (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentMessages = await ContactMessage.countDocuments({
    submittedAt: { $gte: sevenDaysAgo }
  });

  const statistics = {
    total: totalMessages,
    new: newMessages,
    recent: recentMessages,
    bySubject: messagesBySubject.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {})
  };

  res.status(200).json({
    status: 'success',
    data: statistics
  });
});

// @desc    Update message status (admin)
// @route   PATCH /api/contact/messages/:id/status
// @access  Private
const updateMessageStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const message = await ContactMessage.findById(id);

  if (!message) {
    return next(new AppError('Message not found', 404));
  }

  // Update fields
  if (status) message.status = status;
  if (adminNotes) message.adminNotes = adminNotes;

  await message.save();

  res.status(200).json({
    status: 'success',
    message: 'Message status updated successfully',
    data: {
      id: message._id,
      status: message.status,
      updatedAt: message.updatedAt
    }
  });
});

module.exports = {
  submitContactForm,
  getAllContactMessages,
  getContactStatistics,
  updateMessageStatus
};