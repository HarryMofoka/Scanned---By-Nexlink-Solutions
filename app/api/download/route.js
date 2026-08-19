export const dynamic = 'force-dynamic';

import { redis } from '../../../lib/redis';
import { latestApkUrl } from '../../../lib/profile';

export async function GET() {
  try {
    await redis.incr('downloads:total');
  } catch (e) {
    console.error('Download counter failed', e);
  }

  return Response.redirect(latestApkUrl, 302);
}
