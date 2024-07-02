// pages/api/[shortCode].js

import connectToDatabase from "../../lib/mongodb";
import Url from "../../models/urls";

export default async function handler(req, res) {
  const { shortCode } = req.query;

  // Connect to the database
  await connectToDatabase();

  // Find the URL by shortCode
  const urlDoc = await Url.findOne({ shortCode });

  if (urlDoc) {
    // Redirect to the long URL
    res.redirect(urlDoc.longUrl);
  } else {
    res.status(404).json({ error: "URL not found" });
  }
}
