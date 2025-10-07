const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Email service for sending notifications
 */

// Create transporter (using Gmail for demo - configure for your email service in production)
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use app password for Gmail
    },
  });
};

/**
 * Send loan application confirmation email
 * @param {Object} application - Loan application data
 * @param {string} application.email - Applicant email
 * @param {string} application.fullName - Applicant full name
 * @param {string} application.applicationId - Application ID
 */
const sendApplicationConfirmation = async (application) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"USA Bank Loans" <${process.env.EMAIL_USER}>`,
      to: application.email,
      subject: 'Loan Application Received - USA Bank Loans',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a237e; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; }
                .footer { background: #eee; padding: 15px; text-align: center; font-size: 12px; }
                .application-id { background: #e3f2fd; padding: 10px; border-radius: 5px; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>USA Bank Loans</h1>
                    <p>Your Loan Application Has Been Received</p>
                </div>
                <div class="content">
                    <h2>Hello ${application.fullName},</h2>
                    <p>Thank you for choosing USA Bank Loans for your financial needs. We have successfully received your loan application.</p>
                    
                    <div class="application-id">
                        Application ID: <strong>${application.applicationId}</strong>
                    </div>
                    
                    <h3>What Happens Next?</h3>
                    <ol>
                        <li>Our loan specialists will review your application within 24 hours</li>
                        <li>We will contact you via your preferred method</li>
                        <li>You may be asked to provide additional documentation</li>
                        <li>Final decision and funding details</li>
                    </ol>
                    
                    <h3>Need Immediate Assistance?</h3>
                    <p>Call us: +1-800-123-4567<br>
                    Email: loans@usabank.com</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 USA Bank Loans. All rights reserved.</p>
                    <p>This is an automated message. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Application confirmation email sent to: ${application.email}`);
    return info;
  } catch (error) {
    console.error('❌ Error sending application confirmation email:', error);
    throw error;
  }
};

/**
 * Send contact form confirmation email
 * @param {Object} contact - Contact form data
 * @param {string} contact.email - Sender email
 * @param {string} contact.name - Sender name
 * @param {string} contact.subject - Message subject
 */
const sendContactConfirmation = async (contact) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"USA Bank Loans" <${process.env.EMAIL_USER}>`,
      to: contact.email,
      subject: 'Message Received - USA Bank Loans',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a237e; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; }
                .footer { background: #eee; padding: 15px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>USA Bank Loans</h1>
                    <p>Thank You for Contacting Us</p>
                </div>
                <div class="content">
                    <h2>Hello ${contact.name},</h2>
                    <p>Thank you for reaching out to USA Bank Loans. We have received your message and our team will get back to you within 24 hours.</p>
                    
                    <h3>Message Details:</h3>
                    <p><strong>Subject:</strong> ${contact.subject}</p>
                    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    
                    <h3>Need Immediate Assistance?</h3>
                    <p>Call us: +1-800-123-4567<br>
                    Email: loans@usabank.com</p>
                    
                    <p><strong>Business Hours:</strong><br>
                    Monday - Friday: 8:00 AM - 8:00 PM EST<br>
                    Saturday: 9:00 AM - 5:00 PM EST</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 USA Bank Loans. All rights reserved.</p>
                    <p>This is an automated message. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Contact confirmation email sent to: ${contact.email}`);
    return info;
  } catch (error) {
    console.error('❌ Error sending contact confirmation email:', error);
    throw error;
  }
};

/**
 * Send notification to loan officers about new application
 * @param {Object} application - Loan application data
 */
const sendNewApplicationNotification = async (application) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"USA Bank Loans" <${process.env.EMAIL_USER}>`,
      to: 'loanofficers@usabank.com', // Would be actual loan officers email in production
      subject: `New Loan Application - ${application.applicationId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a237e; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; }
                .application-info { background: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Loan Application</h1>
                </div>
                <div class="content">
                    <h2>Application Details</h2>
                    
                    <div class="application-info">
                        <p><strong>Application ID:</strong> ${application.applicationId}</p>
                        <p><strong>Applicant:</strong> ${application.fullName}</p>
                        <p><strong>Email:</strong> ${application.email}</p>
                        <p><strong>Phone:</strong> ${application.phone}</p>
                        <p><strong>Loan Type:</strong> ${application.loanType}</p>
                        <p><strong>Loan Amount:</strong> $${application.loanAmount?.toLocaleString()}</p>
                        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    
                    <p><strong>Next Steps:</strong></p>
                    <ul>
                        <li>Review application in admin dashboard</li>
                        <li>Contact applicant within 24 hours</li>
                        <li>Request additional documents if needed</li>
                    </ul>
                    
                    <p><a href="${process.env.APP_URL}/admin/applications/${application.applicationId}">View Application in Dashboard</a></p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ New application notification sent to loan officers`);
    return info;
  } catch (error) {
    console.error('❌ Error sending new application notification:', error);
    throw error;
  }
};

/**
 * Test email configuration
 */
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('❌ Email server configuration error:', error);
    return false;
  }
};

module.exports = {
  sendApplicationConfirmation,
  sendContactConfirmation,
  sendNewApplicationNotification,
  testEmailConfig
};