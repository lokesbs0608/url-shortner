import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.Url || mongoose.model("Url", UrlSchema);
