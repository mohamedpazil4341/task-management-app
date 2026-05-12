// ============================================
// Database Configuration — MongoDB Connection
// ============================================
// This file handles connecting to MongoDB using Mongoose.
// The connection string is read from environment variables.

const mongoose = require('mongoose');
const dns = require('dns');

// Use Google DNS to resolve MongoDB SRV records
// (fixes issues on networks that block SRV lookups)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit the process with failure code if DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;

