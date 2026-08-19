export const dynamic = 'force-dynamic';

import { redis } from '../../../lib/redis';
import { profile as defaultProfile } from '../../../lib/profile';

// GET /api/card — Reads actual profile data from Redis (or query params / fallback) and returns vCard
export async function GET(request) {
  try {
    await redis.incr('scans:total');
    const today = new Date().toISOString().slice(0, 10);
    await redis.incr(`scans:daily:${today}`);
  } catch (e) {
    console.error('Scan counter failed', e);
  }

  let profile = { ...defaultProfile };

  // 1. Check if real profile data has been published to Redis 'profile:data'
  try {
    const storedData = await redis.get('profile:data');
    if (storedData) {
      const parsed = typeof storedData === 'string' ? JSON.parse(storedData) : storedData;
      if (parsed && typeof parsed === 'object') {
        profile = { ...profile, ...parsed };
      }
    }
  } catch (e) {
    console.error('Failed to read profile:data from Redis', e);
  }

  // 2. Allow query parameter overrides if data is passed directly in the QR / tag URL
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.has('fn')) profile.firstName = searchParams.get('fn');
    if (searchParams.has('ln')) profile.lastName = searchParams.get('ln');
    if (searchParams.has('phone')) profile.phone = searchParams.get('phone');
    if (searchParams.has('email')) profile.email = searchParams.get('email');
  } catch (e) {
    // ignore searchParams parse errors
  }

  const links = Array.isArray(profile.links) ? profile.links : [];

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${profile.lastName || ''};${profile.firstName || ''};;;`,
    `FN:${`${profile.firstName || ''} ${profile.lastName || ''}`.trim()}`,
    profile.phone ? `TEL;TYPE=CELL:${profile.phone}` : null,
    profile.email ? `EMAIL:${profile.email}` : null,
    ...links.map((l) => (typeof l === 'string' ? `URL:${l}` : `URL:${l.url || l.link || ''}`)),
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n');

  return new Response(vcard, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `inline; filename="${profile.firstName || 'contact'}-${profile.lastName || 'card'}.vcf"`,
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

// POST /api/card — Allows the mobile app to sync/publish the actual profile data to Redis
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Invalid profile payload' }, { status: 400 });
    }

    await redis.set('profile:data', JSON.stringify(body));

    return Response.json(
      { success: true, profile: body },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (e) {
    console.error('Failed to save profile:data to Redis', e);
    return Response.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

// OPTIONS handler for CORS preflight from mobile app
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
