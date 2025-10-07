const express = require('express');
const { login, getMe, protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Admin/Loan officer login
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, getMe);

// @route   POST /api/auth/refresh
// @desc    Refresh token (placeholder)
// @access  Public
router.post('/refresh', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Token refresh endpoint - implement as needed'
  });
});

// @route   POST /api/auth/logout
// @desc    Logout (placeholder)
// @access  Private
router.post('/logout', protect, (req, res) => {
  // In production, you might blacklist the token
  res.status(200).json({
    status: 'success',
    message: 'Logout successful'
  });
});

module.exports = router;