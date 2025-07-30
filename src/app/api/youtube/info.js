import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

    const availableQualities = Array.from(
      new Set(formats.map((f) => f.qualityLabel).filter(Boolean))
    ).sort((a, b) => {
      const parse = (q) => parseInt(q);
      return parse(a) - parse(b);
    });

    res.status(200).json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      availableQualities,
      duration: info.videoDetails.lengthSeconds,
    });
  } catch (error) {
    console.error('Info error:', error);
    res.status(500).json({ error: 'Failed to fetch video info' });
  }
}
