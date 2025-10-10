"use client";
import { useState } from 'react';

export default function Tools() {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('');
  const [availableQualities, setAvailableQualities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCheckVideo = async () => {
    if (!url || !url.includes('youtube.com')) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const res = await fetch('/api/youtube/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch video info');
      }

      const data = await res.json();
      setAvailableQualities(data.availableQualities);
      setQuality(data.availableQualities[0]);
      setSuccess(`Video found: ${data.title}`);
    } catch (err) {
      setError(err.message || 'Error fetching video info');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!url || !quality) {
      setError('Please provide both URL and quality');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    const downloadUrl = `/api/youtube/download?url=${encodeURIComponent(url)}&quality=${encodeURIComponent(quality)}`;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccess('Download started!');
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">YouTube Video Downloader</h1>

      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 border rounded-md mb-4"
      />

      <button
        onClick={handleCheckVideo}
        disabled={loading}
        className="w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-700 mb-4 disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Video & Get Qualities'}
      </button>

      {availableQualities.length > 0 && (
        <>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full p-3 border rounded-md mb-4"
          >
            {availableQualities.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>

          <button
            onClick={handleDownload}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Download Video
          </button>
        </>
      )}

      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
      {success && <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">{success}</div>}
    </div>
  );
}
