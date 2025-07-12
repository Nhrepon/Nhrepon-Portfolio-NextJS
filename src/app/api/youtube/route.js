// File: /pages/api/download.js

import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, quality } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const info = await ytdl.getInfo(url);
  const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
  const format = formats.find(f => f.qualityLabel === quality);

  if (!format) {
    return res.status(400).json({ error: 'Requested quality not available' });
  }

  const fileName = `${info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_')}_${quality}.mp4`;

  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Type', 'video/mp4');

  ytdl(url, { quality: format.itag }).pipe(res);
}
