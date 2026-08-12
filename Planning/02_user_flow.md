# User Flow Document (v2)

## Actors
- **Creator** — the person with an account, entering their own info and generating a QR/NFC.
- **Viewer** — the person who scans the QR code or taps the NFC tag to see the Creator's info. Does not need an account.

## Platforms
Both flows below apply identically on web and mobile, except where noted (NFC is mobile-only).

---

## Flow A — Creator: Sign Up & Create a Profile

1. Creator lands on the homepage (web) or opens the app (mobile) → taps "Get started."
2. Creator signs up: email/password, or "Continue with Google/Apple."
3. Once logged in, Creator fills the profile form:
   - Name (required)
   - Phone number (optional)
   - LinkedIn URL (optional)
   - Other social links (optional, add-as-many-as-you-like rows: label + URL)
4. Creator saves.
5. System:
   - Creates a profile record tied to the Creator's account, with a unique, non-guessable public slug (e.g. `a7f3k9`).
   - Generates a QR code encoding `https://yourapp.com/p/a7f3k9`.
6. Creator is shown:
   - Their public profile page preview.
   - The QR code (downloadable/shareable as PNG/SVG).
   - **Mobile only**: a "Write to NFC tag" button — holds phone near a blank NFC tag/sticker to program it with the same profile link.

## Flow B — Creator: Edit / Delete a Profile

1. Creator logs in (web or mobile — same account, same data either way).
2. Opens "My Profile" → edits fields or taps "Delete my profile."
3. On save: public profile page and any already-distributed QR codes/NFC tags immediately reflect the update (the QR/NFC always points to the same slug — the content behind it is what's editable).
4. On delete: profile record is removed; the public URL returns a friendly "This card no longer exists" page instead of an error.

## Flow C — Creator: Check Stats

1. Creator opens the Stats tab, or taps the stats summary shown on the Dashboard.
2. System returns aggregated numbers only: total views, a simple trend over the last 7/30 days, and (optionally) a per-link tap breakdown.
3. No Viewer identity is ever recorded or shown — this is a count, not a log of who scanned the code (see Security Document, section 9, for the privacy boundary this depends on).
4. Each profile view and link tap in Flow D below silently records a count in the background — never blocks or slows down the Viewer's experience.

## Flow D — Viewer: Scan QR or Tap NFC

1. Viewer scans the QR code with their phone camera, or taps their phone against the Creator's NFC tag.
2. Phone opens `https://yourapp.com/p/a7f3k9`.
   - **If the Viewer has the app installed**: opens natively in-app via deep link.
   - **If not**: opens in the default mobile browser — no install required, no account required.
   - This view is counted (profile-level) for the Creator's Stats — anonymously, per Flow C above.
3. Viewer sees a clean, mobile-first page:
   - Creator's name.
   - Tap-to-call phone link (if provided).
   - Tap-to-open buttons for LinkedIn / other socials — each tap is also counted anonymously if the Creator has per-link stats enabled.
4. Viewing never requires login — this stays a zero-friction, public read-only page.

## Flow D — Creator: View Stats

1. Creator logs in (web or mobile) and opens the Stats tab/screen.
2. System returns total view count and a 7/30-day trend for that Creator's own profile only.
3. No identifying information about Viewers is shown or stored — just counts (see Security Document for how this is tracked without collecting Viewer data).
4. If the profile has zero views yet, show an empty state ("No views yet — share your QR code to get started") rather than a blank chart.

## Edge Cases to Handle
- **Profile doesn't exist / was deleted** → friendly "not found" page, not a raw 404/500.
- **Empty profile (no fields filled)** → don't allow QR/NFC generation with zero contact methods; require at least one.
- **Forgot password** → standard Supabase Auth password reset email; no custom logic needed.
- **Malformed/unsafe URLs entered** → validate and reject non-http(s) links server-side.
- **NFC write failure** (tag out of range, tag locked/read-only) → clear in-app error with a retry prompt; never fail silently.
- **App not installed, deep link fallback** → confirm universal links/app links are correctly configured so this degrades gracefully to the web page rather than showing a broken link.
- **Repeated/spam account or profile creation** → rate-limit signups and profile creation per IP/account.

## Simple State Diagram
```
[Sign up / Log in] (web or mobile, same account)
      |
      v
[Profile Form] --save--> [Profile Created/Updated]
      |
      +--> [QR Code] (web + mobile)
      +--> [Write to NFC tag] (mobile only)

[Anyone] --scan QR or tap NFC--> [App installed?]
      --yes--> [Opens natively in-app] --(view logged, anonymous)--> [Creator's Stats]
      --no --> [Opens public profile page in browser] --(view logged, anonymous)--> [Creator's Stats]
                     |
              tap link --> [External app: phone/LinkedIn/etc.]
```
