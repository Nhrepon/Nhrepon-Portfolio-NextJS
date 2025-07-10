import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    const quality = searchParams.get('quality');

    if (!url || !ytdl.validateURL(url)) {
      return new Response(JSON.stringify({ error: 'Invalid YouTube URL' }), { status: 400 });
    }

    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
    const format = formats.find((f) => f.qualityLabel === quality);

    if (!format) {
      return new Response(JSON.stringify({ error: 'Requested quality not available' }), { status: 400 });
    }

    const safeTitle = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${safeTitle}_${quality}.mp4`;

    // Create stream and return as Response
    const stream = ytdl(url, { quality: format.itag });

    return new Response(stream, {
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': 'video/mp4',
      },
    });
  } catch (error) {
    console.error('Error downloading video:', error);
    return new Response(JSON.stringify({ error: 'Failed to download video' }), { status: 500 });
  }
}
