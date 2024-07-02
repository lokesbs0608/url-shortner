// pages/api/encode.js

import connectToDatabase from "../../lib/mongodb";
import Url from "../../models/urls";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { longUrl } = req.body;
    const shortCode = Math.random().toString(36).substr(2, 8); // Example: This should be unique in practice

    // Generate a unique short code
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    // Connect to the database
    await connectToDatabase();

    // Save to the database (example, you should handle uniqueness)
    const newUrl = new Url({ longUrl, shortUrl, shortCode });
    await newUrl.save();

    // Respond with the short URL
    res.status(200).json({ shortUrl });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
