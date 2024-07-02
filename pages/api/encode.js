import connectToDatabase from "../../lib/mongodb";
import Url from "../../models/urls";
import { customAlphabet } from "nanoid";

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === "POST") {
    const { longUrl, length } = req.body; // Extract the long URL from the request body

    // Create a custom alphabet for shorter IDs (optional)
    const alphabet =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nanoid = customAlphabet(alphabet, length); // Generate IDs of length 8

    const shortCode = nanoid(); // Generates a random short code like "yE4rnY2X"

    // Construct the full short URL using the base URL and the short code
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    // Connect to the MongoDB database
    await connectToDatabase();

    // Save the long URL, short URL, and short code to the database
    const newUrl = new Url({ longUrl, shortUrl, shortCode });
    await newUrl.save();

    // Respond with the generated short URL
    res.status(200).json({ shortUrl });
  } else {
    // If the request method is not POST, respond with a 405 Method Not Allowed status
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
