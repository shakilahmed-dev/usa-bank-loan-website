const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Connection event handlers
    mongoose.connection.on('connected', () => {
      console.log('📊 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Mongoose disconnected from MongoDB');
    });

    // Close the Mongoose connection when the Node process ends
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

// MongoDB configuration
const dbConfig = {
  // Connection options
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
  
  // Retry configuration
  retry: {
    maxAttempts: 3,
    delay: 1000, // 1 second
  },
  
  // Pool size configuration
  poolSize: 10,
  
  // Other MongoDB options
  autoIndex: process.env.NODE_ENV !== 'production', // Don't build indexes in production
  maxPoolSize: 100,
  minPoolSize: 5,
};

module.exports = { connectDatabase, dbConfig };