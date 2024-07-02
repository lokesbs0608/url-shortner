"use client";
import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState(8);

  // Handle form submission
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Set loading state to true to indicate that the request is in progress
    setLoading(true);

    try {
      // Make a POST request to the /api/encode endpoint
      const res = await fetch("/api/encode", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify that the request body is JSON
        },
        body: JSON.stringify({ longUrl, length }), // Convert the longUrl state to a JSON string and send it in the request body
      });

      // Parse the JSON response from the server
      const data = await res.json();

      // Check if the response status is OK (status code 200-299)
      if (res.ok) {
        // Set loading state to false since the request is complete
        setLoading(false);
        // Update the shortUrl state with the shortened URL returned from the server
        setShortUrl(data.shortUrl);
      } else {
        // If the response status is not OK, display an error message
        alert(data.error);
        // Set loading state to false since the request is complete
        setLoading(false);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error encoding URL:", error);
      alert("An error occurred while shortening the URL.");
      // Set loading state to false since the request is complete
      setLoading(false);
    }
  };

  const handleCopy = () => {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = shortUrl;
    document.body.appendChild(tempInput);

    // Select the short URL in the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */

    // Copy the selected text
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Optionally, provide feedback to the user
    alert("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto min-h-[90vh] flex items-center justify-center flex-col border border-blue-200 m-2 p-2 text-center">
      <h1 className="h1 font-bold text-4xl break-keep text-blue-800">
        Paste the URL to be shortened
      </h1>
      <form className="flex m-4" onSubmit={handleSubmit}>
        <input
          className="border border-slate-500 w-full px-12 py-3 col-8"
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
        />
        <button
          className="button bg-blue-400 text-white px-12 py-3 col-4"
          type="submit"
        >
          Shorten
        </button>
      </form>
      <div>
        <input
          type="number"
          name="length"
          className="border border-slate-500 p-2"
          id="length"
          value={length}
          min={8}
          required
          max={12}
          onChange={(e) =>
            setLength(+e.target.value >= 8 && +e.target.value <= 12 ? +e.target.value : 8)
          }
        />
        <p>Min.8 & Max. 20</p>
      </div>
      {shortUrl && (
        <div className="mt-4">
          <p>
            <a
              href={shortUrl}
              className="text-green-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </p>
          <button
            className="button text-center bg-gray-300 text-gray-800 px-4 py-2 mt-2"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
      )}
      {loading && <p>Loading... Please wait</p>}
    </div>
  );
}
