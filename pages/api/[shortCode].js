// pages/api/[shortCode].js

import connectToDatabase from "../../lib/mongodb";
import Url from "../../models/urls";

export default async function handler(req, res) {
  const { shortCode } = req.query;

  await connectToDatabase();

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (urlDoc) {
      res.redirect(urlDoc.longUrl);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Server error" });
  }
}
