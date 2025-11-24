import axios from 'axios';

const testForgotPassword = async () => {
  try {
    console.log('Testing forgot password API...');
    
    const response = await axios.post('http://localhost:3000/api/auth/forgot-password', {
      email: 'gellaudaykumar2329@gmail.com'
    });
    
    console.log('✅ Success:', response.data);
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }
};

testForgotPassword();