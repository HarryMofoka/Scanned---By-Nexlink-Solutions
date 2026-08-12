# Security & Privacy Document (v2)

## Why this matters
You're storing personal contact information (phone numbers, social profile links, names, email/login credentials) behind real user accounts, and making some of it *publicly* accessible by design via QR/NFC. Two things need equal attention:
1. Only the fields the Creator explicitly chose to share are ever public.
2. Account credentials, sessions, and anything not marked public are protected like any standard PII + auth system.

## 1. Data Classification
| Data | Sensitivity | Exposure |
|---|---|---|
| Name, social links, phone (on profile) | Personal, user-disclosed | Public (by user's own choice, on their profile page) |
| Email, password hash | Account credential | Private — managed entirely by Supabase Auth, never touched directly by app code |
| Session/JWT tokens | Secret credential | Private — stored securely on-device (Expo SecureStore on mobile, httpOnly cookies or secure storage on web), never logged |
| IP address / request logs | Metadata | Private, used only for abuse prevention, short retention |
| Profile/link view events (Stats feature) | Metadata, anonymous | Private — aggregated counts are shown to the Creator, but individual view records don't identify the Viewer |

## 2. Authentication Model
Now that there's a mobile app and an expectation of streamlined multi-device use, use a **managed auth provider** rather than the earlier token-link approach:
- **Supabase Auth** handles sign-up, login, password hashing, session/JWT issuance, and password reset flows — none of this is custom-built, which meaningfully reduces the app's security surface (no homegrown password storage, no custom reset-token logic).
- Social login (Google/Apple) supported through the same provider — reduces password-reuse risk for users who choose it, and is expected by Apple's App Store guidelines if you offer other third-party logins on iOS.
- Both web and mobile authenticate against the same backend using the same session tokens — no separate auth logic to maintain per platform.
- Sessions expire and refresh via Supabase's standard token rotation; no custom session management needed.

## 3. Data in Transit
- Enforce HTTPS everywhere (web, API, and the URLs encoded in QR/NFC).
- Set `Strict-Transport-Security` headers on the web app.
- QR codes and NFC tags encode only the opaque profile URL — never raw personal data. If a QR image or NFC tag is copied/cloned, it reveals nothing beyond a link to a page the Creator already made public.
- NFC-specific: writing a tag is a local, phone-to-tag operation (not sent over the network) — the URL written is the same public link as the QR, so there's no additional data-in-transit risk beyond what QR already has.

## 4. Data at Rest
- Postgres via Supabase, encrypted at rest by default (managed tier) — verify this is enabled at project setup.
- Passwords never touch your own database in plaintext or even as a custom hash — Supabase Auth manages the credentials table separately from your `profiles`/`links` tables.
- Keep public-facing fields (`profiles`, `links`) clearly separated from account/auth data in the schema so it's easy to audit exactly what the public API can ever expose.

## 5. API / Backend Hygiene
- The **public profile endpoint** (`GET /api/p/:slug`) must only ever return allow-listed fields (name, phone, links) — never email, internal user ID, or auth-related data.
- All other endpoints (`/api/profiles/me`, edit, delete) require a valid session token, verified server-side on every request — never trust a client-supplied user ID.
- Validate all input server-side: reject non-http(s) URLs, cap field lengths, escape/sanitize any user-supplied text or links before rendering on the public profile page (stored XSS prevention, since this page renders user input to arbitrary strangers).
- Use parameterized queries / an ORM (or Supabase's client library, which does this by default) to avoid SQL injection.

## 6. Abuse & Spam Prevention
- Rate-limit sign-ups and profile creation per IP/account (e.g., 5–10 per hour) to prevent spam account/profile farming — genuinely still relevant even at 100 target users, since public sign-up forms attract bots regardless of intended scale.
- CAPTCHA (e.g., Cloudflare Turnstile — free) on sign-up if abuse becomes an issue.
- Use non-sequential, random profile slugs so people can't enumerate other users' profiles by guessing IDs.
- Basic reporting mechanism for viewers to flag a malicious/phishing profile link for takedown.

## 7. Mobile-Specific Considerations
- Store session tokens in **Expo SecureStore** (backed by iOS Keychain / Android Keystore), never in plain AsyncStorage.
- NFC writing is a local device operation — no special network security concerns, but validate the URL being written matches the Creator's actual profile slug before writing, to prevent any client-side tampering from writing an unintended link.
- Deep link / universal link configuration should be verified against domain ownership (Apple App Site Association file, Android Digital Asset Links) so malicious apps can't hijack your `yourapp.com/p/*` links.

## 8. View Stats — Privacy-Safe Tracking
The Stats feature means the public profile endpoint now writes a record on every view — new data collection about Viewers, a group who never sign up and never consented to anything beyond scanning a QR code. Keep this strictly bounded:
- **Track counts, not people.** The `views` table stores only a profile ID, an optional link ID, and a timestamp — **no IP address, no device fingerprint, no cookie, no viewer identity of any kind**. It should be architecturally impossible to answer "who viewed my card," only "how many times" and "which links."
- **Bot/refresh inflation is a cosmetic problem, not a security one** at this scale — don't over-engineer dedup logic. A simple short-window de-dupe (e.g., ignore repeat views from the same IP within 30 minutes, checked transiently and never persisted) is enough, and even that's optional for a v1.
- Don't join or correlate `views` data against your abuse-prevention IP logs (section 6) — keep those two systems separate on purpose, so view counts can never be de-anonymized after the fact.
- **Stats are only ever visible to the Creator who owns the profile**, returned via the authenticated `/api/profiles/me/stats` endpoint — never exposed on the public profile page or to other users.
- Disclose this plainly in the privacy policy: "We count views of your public profile to show you basic stats. We don't record who viewed it." This scope boundary is a product decision, not just a technical one — if a future feature ever wants "who scanned me," that's a materially bigger privacy commitment (Viewer identity, consent, geolocation) and deserves its own explicit design pass rather than being layered onto the current `views` table.

## 9. Privacy & Compliance Basics
- Be aware of **POPIA** (South Africa) and **GDPR** (if you'll have EU users). Practical steps regardless of exact jurisdiction:
  - Tell users clearly, at profile-creation time, what will be public vs. private.
  - Give a working, self-serve way to delete their account and all associated data.
  - Collect only what's needed — no required fields beyond what the product needs to function.
  - Publish a simple privacy policy: what's collected, why, retention period, how to request deletion.
- Log retention: keep abuse-prevention logs (IP, timestamps) for a limited window (e.g., 30–90 days), not indefinitely.

## 10. Practical MVP Security Checklist
- [ ] HTTPS enforced everywhere (web, API, encoded links)
- [ ] Auth fully delegated to Supabase Auth (no custom password/token handling)
- [ ] Session tokens stored securely on-device (SecureStore on mobile, secure storage on web)
- [ ] Public API returns only allow-listed profile fields
- [ ] Input validation + output escaping (XSS protection) on all user-entered text/links
- [ ] Rate limiting on sign-up, profile creation, and public endpoint
- [ ] Non-sequential, random profile slugs
- [ ] Working account/profile delete flow that fully removes data
- [ ] Deep link domain verification (App Site Association / Digital Asset Links)
- [ ] Basic privacy policy + clear public-vs-private disclosure on the profile form
- [ ] Encryption at rest via Supabase's managed Postgres
- [ ] View-tracking (`views` table) stores no IP/identity — counts only, kept separate from abuse-prevention logs
