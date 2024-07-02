import connectToDatabase from "../../lib/mongodb";
import Url from "../../models/urls";
import { nanoid } from "nanoid";

const baseURL = process.env.BASE_URL;

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // Function to generate a short code from a long URL
    const shortCode = nanoid(12);

    const newUrl = new Url({
      longUrl,
      shortCode,
    });

    await newUrl.save();

    res.status(200).json({ shortUrl: `${baseURL}${shortCode}` });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
