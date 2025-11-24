import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const existingUser = await User.findOne({ email: 'gellaudaykumar2329@gmail.com' });
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }
    
    const testUser = new User({
      name: 'Test User',
      email: 'gellaudaykumar2329@gmail.com',
      password: 'password123'
    });
    
    await testUser.save();
    console.log('✅ Test user created successfully');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

createTestUser();