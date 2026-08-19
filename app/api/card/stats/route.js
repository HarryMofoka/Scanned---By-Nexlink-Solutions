export const dynamic = 'force-dynamic';

import { redis } from '../../../../lib/redis';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export async function GET() {
  try {
    const total = (await redis.get('scans:total')) ?? 0;
    return Response.json(
      { scans: Number(total) },
      { headers: { ...corsHeaders, 'Cache-Control': 's-maxage=30' } }
    );
  } catch (e) {
    console.error('Stats read failed', e);
    return Response.json(
      { scans: null, error: 'unavailable' },
      { status: 503, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
