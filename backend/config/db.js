/**
 * Database Configuration
 *
 * Connects to MongoDB using Mongoose
 * Connection string from environment variable: MONGO_URI
 */

import mongoose from "mongoose";

/**
 * Connect to MongoDB
 *
 * Environment Variables Required:
 * - MONGO_URI: MongoDB connection string
 *   Example: mongodb+srv://user:pass@cluster.mongodb.net/dbname
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ DB Error:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
