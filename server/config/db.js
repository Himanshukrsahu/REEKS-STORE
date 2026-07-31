import mongoose from 'mongoose';

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
