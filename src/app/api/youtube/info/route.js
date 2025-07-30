import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // ⚡ force Node runtime to allow ytdl-core

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
    const availableQualities = Array.from(
      new Set(formats.map((f) => f.qualityLabel).filter(Boolean))
    ).sort((a, b) => parseInt(a) - parseInt(b));

    return NextResponse.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      availableQualities,
      duration: info.videoDetails.lengthSeconds,
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    return NextResponse.json({ error: 'Failed to get video info' }, { status: 500 });
  }
}
