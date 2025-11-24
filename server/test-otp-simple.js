import dotenv from 'dotenv';
import emailService from './src/services/emailService.js';

dotenv.config();

console.log('Testing OTP email...');

const testEmail = async () => {
  try {
    const result = await emailService.sendOTP('nareshrajaparimala000@gmail.com', '123456', 'Test User');
    
    if (result.success) {
      console.log('✅ OTP email sent successfully!');
      console.log('Message ID:', result.messageId);
    } else {
      console.log('❌ Failed to send OTP email');
      console.log('Error:', result.error);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
};

testEmail();