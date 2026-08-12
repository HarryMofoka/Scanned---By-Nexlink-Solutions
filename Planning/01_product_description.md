# Product Description Document (v2)

## Working Name
**TapShare** (placeholder — rename as you like)

## One-line pitch
A web + mobile app where anyone can create an account and a personal "contact profile" (phone, LinkedIn, social handles). The app generates a QR code and, on mobile, an NFC tag option — either of which, when scanned/tapped, opens a page showing that person's shared info. One scan or tap replaces manually exchanging numbers and handles.

## Problem
Sharing contact info at networking events, meetings, or casual encounters is friction-heavy: reading out a phone number, spelling a handle, or making someone type your LinkedIn URL. Paper business cards solve the friction but are static, hard to update, and easy to lose.

## Solution
A digital "profile card" with real accounts so it can be updated anytime and used across devices:
1. User signs up (email/password or Google/Apple sign-in) on web or mobile.
2. User enters their info (phone, LinkedIn, other social handles/links).
3. The app generates a unique QR code linked to a hosted profile page, and — in the mobile app — can also write that same link to a physical NFC tag.
4. Anyone who scans the QR or taps the NFC tag is taken straight to a public web page showing the person's shared info, with tap-to-call / tap-to-open links.

## Core Features (MVP, scoped for ~100 users)
- Account sign-up/login (email/password + Google/Apple social login) — same account works on web and mobile.
- Simple profile form: name, phone (optional), LinkedIn, other social links (Instagram, X/Twitter, WhatsApp, email, website — user picks which to add).
- Auto-generated unique profile URL + QR code, available on both web and mobile.
- Public profile view page (mobile-first, clean, fast-loading) — no login required to view.
- Edit/update the profile anytime by logging back in, on either platform.
- Download/share the QR code (PNG/SVG).
- **Mobile-only**: write the profile link to a blank NFC tag directly from the app.
- Deep linking: if the person scanning has the app installed, the QR/NFC opens the profile natively in-app; otherwise it falls back to the web page automatically.
- Basic stats: total profile views and a simple 7/30-day trend, shown on both web and mobile — anonymous counts only, never who viewed the card (see Security Document).

## Not in MVP (avoid overengineering)
- No "who scanned me" identity tracking — stats are anonymous counts only, by design (see Security Document).
- No social feed or messaging.
- No org/team/business branding features.
- No custom themes for profile pages beyond one clean default design.
- No phone-to-phone live NFC handshake (Apple NameDrop–style) — only static NFC tags encoding a link. See prior discussion: live device-to-device NFC needs platform-specific native handshakes and is a meaningfully bigger project.

## Target Users
- Professionals at conferences/networking events.
- Freelancers/creators wanting a "linktree + contact card" hybrid.
- Anyone who wants a faster, always-up-to-date alternative to a paper business card.

## Visual Design
TapShare uses a dark-first design system — near-black backgrounds, a two-accent palette (coral + periwinkle), bold rounded cards, and white "data" cards for stats and content. Full token spec in the Design System Document.

## Platforms
- **Web app** (Next.js): full account creation, profile management, and public profile viewing.
- **Mobile app** (React Native/Expo, iOS + Android from one codebase): same features as web, plus NFC tag writing.
- One shared backend/API and database power both — see the Architecture Document.

## Data Handled
Name, phone number, and links to third-party profiles the user explicitly chooses to share, tied to a real user account (email, hashed password or social login token). This is personal data — see the Security Document for how it's protected.

## Success Criteria for MVP
- A person can sign up and have a working QR code in under 2 minutes.
- Scanning the QR or tapping NFC reliably opens the profile page in under 2 seconds.
- The user can log in from either web or mobile and see the same, up-to-date profile.
- Comfortably supports ~100 users on free/near-free infrastructure tiers (see Architecture Document).

## Possible Future Additions (post-MVP, not now)
- vCard (.vcf) download so scanners can save contact directly to phone.
- Deeper analytics beyond anonymous counts (would require an explicit privacy/consent redesign — see Security Document, section 9).
- Custom profile themes/branding.
- Expiring/temporary QR codes for specific events.
- True phone-to-phone NFC sharing.
