"use client"
import { useState } from 'react';
import "./globals.css";

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true)
    const res = await fetch('/api/encode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ longUrl }),
    });

    const data = await res.json();
    if (res.ok) {
      setLoading(false)
      setShortUrl(data.shortUrl);
    } else {
      alert(data.error);
    }
  };

  const handleCopy = () => {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = shortUrl;
    document.body.appendChild(tempInput);

    // Select the short URL in the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */

    // Copy the selected text
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Optionally, provide feedback to the user
    alert('Copied to clipboard!');
  };

  return (
    <div className='container mx-auto min-h-[90vh] flex items-center justify-center flex-col border border-blue-200 m-2 p-2 text-center'>
      <h1 className='h1 font-bold text-4xl break-keep text-blue-800'>Paste the URL to be shortened</h1>
      <form className='flex m-4' onSubmit={handleSubmit}>
        <input
          className='border border-slate-500 w-full px-12 py-3 col-8'
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
        />
        <button className='button bg-blue-400 text-white px-12 py-3 col-4' type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div className="mt-4">
          <p><a href={shortUrl} className='text-green-700' target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          <button className="button text-center bg-gray-300 text-gray-800 px-4 py-2 mt-2" onClick={handleCopy}>Copy</button>
        </div>
      )}
      {loading && (
        <p>Loading... Please wait</p>
      )}
    </div>
  );
}
