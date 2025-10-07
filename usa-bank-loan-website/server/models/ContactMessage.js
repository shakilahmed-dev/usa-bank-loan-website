const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  // Sender Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
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
    trim: true
  },
  
  // Message Details
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: {
      values: [
        'mortgage', 
        'auto', 
        'business', 
        'personal', 
        'student', 
        'general', 
        'other'
      ],
      message: 'Invalid subject'
    }
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  contactMethod: {
    type: String,
    enum: {
      values: ['phone', 'email', 'text'],
      message: 'Invalid contact method'
    },
    default: 'email'
  },
  
  // Metadata
  status: {
    type: String,
    enum: {
      values: ['new', 'read', 'replied', 'archived'],
      message: 'Invalid message status'
    },
    default: 'new'
  },
  ipAddress: {
    type: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  repliedAt: {
    type: Date
  },
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes
contactMessageSchema.index({ status: 1 });
contactMessageSchema.index({ submittedAt: -1 });
contactMessageSchema.index({ email: 1 });

// Pre-save middleware
contactMessageSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'replied' && !this.repliedAt) {
    this.repliedAt = new Date();
  }
  next();
});

// Static method to get unread messages
contactMessageSchema.statics.getUnread = function() {
  return this.find({ status: 'new' }).sort({ submittedAt: -1 });
};

// Static method to get messages by subject
contactMessageSchema.statics.getBySubject = function(subject) {
  return this.find({ subject }).sort({ submittedAt: -1 });
};

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

module.exports = ContactMessage;