export const dynamic = 'force-dynamic';

import { redis } from '../../../lib/redis';
import { profile } from '../../../lib/profile';

export async function GET() {
  try {
    await redis.incr('scans:total');
    const today = new Date().toISOString().slice(0, 10);
    await redis.incr(`scans:daily:${today}`);
  } catch (e) {
    console.error('Scan counter failed', e);
  }

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${profile.lastName};${profile.firstName};;;`,
    `FN:${profile.firstName} ${profile.lastName}`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `EMAIL:${profile.email}`,
    ...profile.links.map((l) => `URL:${l.url}`),
    'END:VCARD',
  ].join('\r\n');

  return new Response(vcard, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `inline; filename="${profile.firstName}-${profile.lastName}.vcf"`,
      'Cache-Control': 'no-store',
    },
  });
}
