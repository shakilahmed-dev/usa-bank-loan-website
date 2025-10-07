const jwt = require('jsonwebtoken');
const { AppError, asyncHandler } = require('./errorHandler');

/**
 * Authentication middleware for protecting routes
 */

// Mock user database (in production, use real database)
const users = [
  {
    id: 1,
    email: 'admin@usabank.com',
    password: 'hashed_password_here', // In production, use bcrypt
    role: 'admin',
    name: 'System Administrator'
  },
  {
    id: 2,
    email: 'loanofficer@usabank.com',
    password: 'hashed_password_here',
    role: 'loan_officer',
    name: 'Loan Officer'
  }
];

/**
 * Generate JWT token
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      name: user.name 
    },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
};

/**
 * Protect routes - require authentication
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Access denied. No token provided.', 401));
  }

  try {
    // Verify token
    const decoded = verifyToken(token);
    
    // Find user by id (in production, query database)
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return next(new AppError('User not found.', 401));
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Invalid token.', 401));
  }
});

/**
 * Restrict to specific roles
 * @param {...string} roles - Allowed roles
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Access denied. Please log in.', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Access denied. Insufficient permissions.', 403));
    }

    next();
  };
};

/**
 * Admin only middleware
 */
const adminOnly = restrictTo('admin');

/**
 * Loan officer or admin middleware
 */
const loanOfficerOrAdmin = restrictTo('admin', 'loan_officer');

/**
 * Mock login function (for demo purposes)
 * In production, use proper authentication with bcrypt
 */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Find user (in production, query database and use bcrypt)
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  // Mock password check (in production, use bcrypt.compare)
  if (password !== 'password') { // Default password for demo
    return next(new AppError('Invalid email or password', 401));
  }

  // Generate token
  const token = generateToken(user);

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    data: {
      user: userWithoutPassword,
      token
    }
  });
});

/**
 * Get current user
 */
const getMe = asyncHandler(async (req, res, next) => {
  const { password: _, ...userWithoutPassword } = req.user;
  
  res.status(200).json({
    status: 'success',
    data: {
      user: userWithoutPassword
    }
  });
});

module.exports = {
  generateToken,
  verifyToken,
  protect,
  restrictTo,
  adminOnly,
  loanOfficerOrAdmin,
  login,
  getMe
};