import axios from 'axios';

const testAPI = async () => {
  try {
    console.log('Testing forgot password API...');
    
    const response = await axios.post('http://localhost:3000/api/auth/forgot-password', {
      email: 'gellaudaykumar2329@gmail.com'
    });
    
    console.log('✅ API Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('❌ API Error:', error.response.data);
    } else {
      console.log('❌ Network Error:', error.message);
    }
  }
};

testAPI();