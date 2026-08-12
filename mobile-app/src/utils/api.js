/** Placeholder API client — replace with Supabase when backend is wired. */

const API_BASE = 'https://your-api.vercel.app/api';

export async function fetchProfile() {
  // TODO: GET /api/profiles/me with auth token
  return { name: 'Demo User', phone: '+27 12 345 6789', links: [] };
}

export async function updateProfile(data) {
  // TODO: PATCH /api/profiles/me
  return { ok: true };
}

export async function fetchStats() {
  // TODO: GET /api/profiles/me/stats
  return { totalViews: 47, trend: [12, 18, 24, 30, 47], nfcTaps: 12 };
}
