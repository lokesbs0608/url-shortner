import mongoose from "mongoose";

// Define the schema for storing URL information
const UrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true, // Long URL is required
  },
  shortUrl: {
    type: String,
    required: true, // Shortened URL is required
  },
  shortCode: {
    type: String,
    required: true, // Short code is required
    unique: true, // Ensure short code is unique
  },
});

// Export the Url model, or create it if it doesn't exist
export default mongoose.models.Url || mongoose.model("Url", UrlSchema);
