/**
 * Utility functions for generating unique IDs
 */

/**
 * Generate a unique application ID
 * Format: APP{timestamp}{randomString}
 * @returns {string} Unique application ID
 */
const generateApplicationId = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `APP${timestamp.slice(-8)}${random}`;
};

/**
 * Generate a unique message ID
 * Format: MSG{timestamp}{randomString}
 * @returns {string} Unique message ID
 */
const generateMessageId = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MSG${timestamp.slice(-10)}${random}`;
};

/**
 * Generate a unique reference number
 * Format: REF{date}{sequentialNumber}
 * @returns {string} Unique reference number
 */
const generateReferenceNumber = () => {
  const now = new Date();
  const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `REF${dateStr}${randomNum}`;
};

/**
 * Generate a unique token for email verification or other purposes
 * @param {number} length - Length of the token
 * @returns {string} Unique token
 */
const generateToken = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return token;
};

/**
 * Generate a unique file name for uploaded documents
 * @param {string} originalName - Original file name
 * @returns {string} Unique file name
 */
const generateFileName = (originalName) => {
  const timestamp = Date.now();
  const extension = originalName.split('.').pop();
  const random = Math.random().toString(36).substring(2, 8);
  return `doc_${timestamp}_${random}.${extension}`;
};

/**
 * Generate a unique session ID
 * @returns {string} Unique session ID
 */
const generateSessionId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `SESS${timestamp}${random}`.toUpperCase();
};

module.exports = {
  generateApplicationId,
  generateMessageId,
  generateReferenceNumber,
  generateToken,
  generateFileName,
  generateSessionId
};