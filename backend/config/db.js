// db.js
import 'dotenv/config'; // Ensure environment variables are loaded
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB connection string

if (!uri) {
  throw new Error('MONGODB_URI is not defined');
}

const client = new MongoClient(uri); // No need for deprecated options

async function connectDB() {
  console.log("Connecting to MongoDB...");
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

export { client, connectDB };
