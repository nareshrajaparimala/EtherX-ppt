import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing email configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
  logger: true
});

// Test connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email transporter verified');
    
    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self for testing
      subject: 'Test OTP - EtherXPPT',
      text: 'Your OTP is: 123456'
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('❌ Send mail error:', error);
      } else {
        console.log('✅ Email sent:', info.response);
      }
    });
  }
});