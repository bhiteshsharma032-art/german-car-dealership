/**
 * Email Configuration Test Script
 * 
 * Run this to test your email setup before deploying:
 * node test-email.js
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Testing Email Configuration...\n');

// Check environment variables
console.log('📋 Configuration:');
console.log(`   SMTP_HOST: ${process.env.SMTP_HOST || '❌ Not set'}`);
console.log(`   SMTP_PORT: ${process.env.SMTP_PORT || '❌ Not set'}`);
console.log(`   SMTP_USER: ${process.env.SMTP_USER || '❌ Not set'}`);
console.log(`   SMTP_PASS: ${process.env.SMTP_PASS ? '✅ Set' : '❌ Not set'}`);
console.log(`   CONTACT_EMAIL: ${process.env.CONTACT_EMAIL || '❌ Not set'}\n`);

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error('❌ Error: SMTP_USER and SMTP_PASS must be set in .env file');
  process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Test connection
console.log('🔌 Testing SMTP connection...');
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Check your SMTP credentials');
    console.log('   2. For Gmail, use an App Password (not your regular password)');
    console.log('   3. Verify your email provider allows SMTP');
    console.log('   4. Try port 465 with SMTP_SECURE=true');
    process.exit(1);
  } else {
    console.log('✅ SMTP connection successful!\n');
    sendTestEmail();
  }
});

// Send test email
async function sendTestEmail() {
  console.log('📧 Sending test email...');
  
  const mailOptions = {
    from: `"Nordhessen Automobile Test" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: '✅ Test Email - Nordhessen Automobile',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .success { background: #10b981; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .info { background: #e5e7eb; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #dc2626; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎉 Email Setup Successful!</h1>
          </div>
          <div class="content">
            <div class="success">
              <h2 style="margin: 0;">✅ Your email configuration is working!</h2>
            </div>
            
            <p>Congratulations! Your Nordhessen Automobile website can now send emails.</p>
            
            <div class="info">
              <h3>Configuration Details:</h3>
              <ul>
                <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</li>
                <li><strong>SMTP Port:</strong> ${process.env.SMTP_PORT}</li>
                <li><strong>From Email:</strong> ${process.env.SMTP_USER}</li>
                <li><strong>To Email:</strong> ${process.env.CONTACT_EMAIL || process.env.SMTP_USER}</li>
              </ul>
            </div>
            
            <h3>What's Next?</h3>
            <ol>
              <li>Test the contact form on your website</li>
              <li>Test the trade-in form</li>
              <li>Test the financing form</li>
              <li>Check your spam folder if emails don't arrive</li>
            </ol>
            
            <p><strong>Note:</strong> This is a test email. Your actual form submissions will have different formatting and content.</p>
            
            <div class="footer">
              <p>Test email sent at: ${new Date().toLocaleString('de-DE')}</p>
              <p>Nordhessen Automobile - Email System</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   To: ${process.env.CONTACT_EMAIL || process.env.SMTP_USER}\n`);
    console.log('🎉 Email setup is complete and working!');
    console.log('💡 Check your inbox (and spam folder) for the test email.\n');
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
    process.exit(1);
  }
}
