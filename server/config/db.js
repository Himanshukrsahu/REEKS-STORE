import mongoose from 'mongoose';
import dns from 'dns';

// Ensure Windows DNS uses Google/Cloudflare DNS for MongoDB Atlas SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/reeksstore');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Error connecting to MongoDB: ${error.message}`);
    console.warn('MongoDB offline. Express is operating on JSON fallback database.');
  }
};

export default connectDB;
