# Architecture Document (Scoped for ~100 users)

## Guiding principle
Build the *shape* of a system that could grow later (shared API, real auth, clean data model) but pick the smallest, cheapest, lowest-maintenance implementation of each piece. At 100 users, almost everything below runs comfortably on free or near-free tiers.

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Web app | Next.js (React) | Public profile pages + creation/edit UI in one framework, deploys free on Vercel |
| Mobile app | Expo (React Native) | One codebase → iOS + Android, shares logic/types with the web app |
| Backend API | Node.js + Express (or Next.js API routes — see note below) | Simple REST API both clients call |
| Database | Postgres via Supabase (free tier) | Managed, encrypted at rest, includes auth built-in |
| Auth | Supabase Auth | Handles sign-up/login, password hashing, Google/Apple sign-in, sessions — no custom auth code |
| Hosting (web + API) | Vercel free tier | Zero-maintenance deploys, HTTPS by default |
| Mobile builds/distribution | Expo Application Services (EAS), free tier | Handles iOS/Android builds without owning build servers |
| QR generation | `qrcode` npm package, client-side | No server cost, no external API |
| NFC | Native Expo NFC module (mobile only) | Write profile URL to tags directly from the app |

**Note on backend**: at 100 users, you honestly don't need a separate Express server — **Next.js API routes** (or Supabase's auto-generated REST API from your Postgres schema) can serve as your entire backend. That removes an entire service to deploy/maintain. Only split into a standalone Express/Nest service later if your API logic outgrows what fits comfortably alongside the web app.

**What we're deliberately skipping at this scale**: CDN edge-caching, connection pooling (PgBouncer), microservices, dedicated observability stack, load balancers. All meaningfully more infrastructure than 100 users justifies — the free tiers of Vercel + Supabase handle this traffic without tuning.

---

## 2. Data Model

```
users
------
id            uuid (pk, from Supabase Auth)
email         text
created_at    timestamptz

profiles
------
id            text (pk, short random slug e.g. "a7f3k9")
user_id       uuid (fk -> users.id)
name          text
phone         text, nullable
created_at    timestamptz
updated_at    timestamptz

links
------
id            uuid (pk)
profile_id    text (fk -> profiles.id)
label         text        -- e.g. "LinkedIn", "Instagram"
url           text
sort_order    int

views
------
id            uuid (pk)
profile_id    text (fk -> profiles.id)
link_id       uuid, nullable (fk -> links.id)   -- null = profile page view, set = a specific link was tapped
viewed_at     timestamptz
```

Notes on `views`:
- One row per profile view or per-link tap — kept intentionally minimal (no IP, no user agent, no viewer identity) since this table exists purely to power the Stats screen, not to build a tracking/analytics product. See the Security Document's updated privacy section for why this matters.
- At 100 users' worth of traffic this table stays tiny — no partitioning or archiving needed yet. If it grows large later, the standard move is to periodically roll old rows into a daily/weekly aggregate table and drop the raw rows — not needed now.
- Indexed on `profile_id` and `viewed_at` so the Stats screen's "views over last 7/30 days" query stays fast without extra tuning.

Notes:
- `profiles.id` is the public slug used in the QR/NFC URL (`/p/a7f3k9`) — random and non-sequential (see Security Document).
- Links live in their own table rather than a JSON blob so ordering/editing individual links is simple and the public API can select only what's needed.
- One user can have one profile for MVP simplicity (easy to extend to multiple profiles per user later — the schema already supports it via `user_id`).

---

## 3. API Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/signup` / `/login` | — | Handled by Supabase Auth directly (client SDK), no custom code needed |
| POST | `/api/profiles` | Required | Create a profile (name, phone, links) for the logged-in user |
| GET | `/api/profiles/me` | Required | Get the logged-in user's own profile (for editing) |
| PATCH | `/api/profiles/me` | Required | Update profile fields/links |
| DELETE | `/api/profiles/me` | Required | Delete profile + links |
| GET | `/api/p/:slug` | **Public** | Return only public-safe fields for the profile page (name, phone, links) — used by both the web viewer page and to power what the QR/NFC opens. Also inserts a `views` row (profile-level) for stats. |
| POST | `/api/p/:slug/link-click` | **Public** | Fired when a Viewer taps a specific link (LinkedIn, Instagram, etc.) on the public profile — inserts a `views` row with `link_id` set, for the optional per-link breakdown on the Stats screen |
| GET | `/api/profiles/me/stats` | Required | Returns aggregated view counts (total, last 7/30 days, per-link breakdown) for the logged-in user's own profile — powers the Stats screen |

That's the whole API surface. Public reads go through allow-listed endpoints; everything that touches a specific user's data requires their session. View logging is deliberately lightweight — a single insert, no synchronous blocking of the page response (fire-and-forget or a queued write) so adding stats never slows down the actual profile view.

---

## 4. Auth Model
Since we now have a mobile app and want streamlining, use real accounts via Supabase Auth instead of the earlier token-link approach:
- Email/password plus optional "Sign in with Google/Apple" (nice fit for a contact-sharing app, and Apple requires it if you offer any other social login on iOS).
- Supabase issues a JWT session, used by both the mobile app and web app to call the protected endpoints above.
- Public profile pages (`/p/:slug`) need **no auth** — that endpoint is intentionally open, matching the "scan and view" flow.

---

## 5. Stats Feature Scope
Now formally in scope (not deferred) per the Mobile Screens document's Stats screen:
- Profile-level view count (all-time + trend over last 7/30 days).
- Optional per-link tap breakdown.
- No date-range pickers, exports, or filters — a small chart plus a couple of numbers is the entire feature. This keeps the `views` table and the two new endpoints above proportionate to what's actually being built.

## 6. Mobile-Specific Notes
- Expo's `expo-nfc` (or a community module, since NFC support in Expo is evolving — check current package status when you start building) lets the app **write** a profile's URL to a blank NFC tag directly from the phone — no external hardware needed.
- QR generation happens client-side in both apps using the same `qrcode` library (JS port available for both React and React Native).
- Deep linking: configure both apps to register `yourapp.com/p/*` as a universal link (iOS) / app link (Android), so if someone *with the app installed* scans a QR/taps NFC, it opens natively in-app instead of a browser tab. Falls back to the web page automatically for anyone without the app — this is what keeps the "no friction for strangers" promise intact.

---

## 7. Deployment Summary
- **Web + API**: single Vercel project, auto-deployed from your Git repo.
- **Database + Auth**: single Supabase project (free tier comfortably handles 100 users' worth of reads/writes).
- **Mobile**: Expo EAS build → submit to TestFlight/Play Console.
- **Cost at this scale**: effectively $0–$25/mo total (Supabase and Vercel free tiers cover this; only real cost is Apple Developer Program's $99/year if you publish to the App Store).

---

## 8. Growth headroom (not built now, just noted)
If you outgrow 100 users significantly, the upgrade path from this architecture is straightforward and doesn't require a rewrite:
- Add CDN caching on `/api/p/:slug` once public traffic grows.
- Move off Supabase's shared free-tier DB to a dedicated instance + connection pooling.
- Split the API into its own service if Next.js API routes start feeling cramped.
- Add PostHog/Sentry once you have enough users for the data to be actionable.

This is intentionally deferred — none of it is needed at 100 users, and building it now would be the overengineering we're trying to avoid.
