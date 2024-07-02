import connectToDatabase from "../../lib/mongodb";
import Url from "../../models/urls";

export default async function handler(req, res) {
  const { shortCode } = req.query; // Extract the short code from the query parameters

  // Connect to the MongoDB database
  await connectToDatabase();

  // Find the document in the database that matches the short code
  const urlDoc = await Url.findOne({ shortCode });

  if (urlDoc) {
    // If a matching document is found, redirect to the long URL
    res.redirect(urlDoc.longUrl);
  } else {
    // If no matching document is found, respond with a 404 Not Found status
    res.status(404).json({ error: "URL not found" });
  }
}
