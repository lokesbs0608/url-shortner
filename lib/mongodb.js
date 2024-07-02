import mongoose from "mongoose";

// Retrieve the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

// Create a global cached connection variable
let cached = global.mongoose;

// If the cached variable does not exist, initialize it
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to the MongoDB database, using a cached connection if available
async function connectToDatabase() {
  // If there is an existing connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If there is no connection promise, create one
  if (!cached.promise) {
    const opts = {
      // Removed deprecated options
    };

    // Log the MongoDB URI for debugging purposes
    console.log("Connecting to MongoDB with URI:", MONGODB_URI);

    // Create a connection promise and cache it
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connected");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }

  // Wait for the connection promise to resolve and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
