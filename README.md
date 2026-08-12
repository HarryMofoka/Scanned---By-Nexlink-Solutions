# ScanByNexlink

> Your contact card, one tap away.

A digital contact-card platform where anyone can create a profile (phone, LinkedIn, social handles), generate a QR code and NFC tag, and share their info with a single scan or tap — no app required for the person on the other end.

---

## Table of Contents

- [Overview](#overview)
- [Problem & Solution](#problem--solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Design System](#design-system)
- [Architecture](#architecture)
- [Security & Privacy](#security--privacy)
- [Mobile App](#mobile-app)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

ScanByNexlink replaces paper business cards with a **live digital profile** that's always up to date. Users sign up, add their contact info, and get a unique QR code and profile link. Anyone who scans the QR code or taps an NFC tag sees the user's info instantly in their phone browser — zero friction, no app install needed for the viewer.

### Key Value Props

- **One profile, always current** — change your number or add a new link, and every QR/NFC you've shared updates automatically
- **QR + NFC** — scan with a camera or tap an NFC sticker
- **No app needed for viewers** — the public profile is a fast, mobile-first web page
- **Private by design** — only what you choose to share is public; view stats are anonymous counts only

---

## Problem & Solution

**Problem:** Sharing contact info at networking events, meetings, or casual encounters is friction-heavy. Reading out phone numbers, spelling handles, or making someone type a LinkedIn URL. Paper cards are static, hard to update, and easy to lose.

**Solution:** A digital "profile card" with real accounts:

1. User signs up (email/password or Google/Apple sign-in) on web or mobile
2. User enters their info (phone, LinkedIn, social handles/links)
3. App generates a unique QR code linked to a hosted profile page
4. On mobile, the same link can be written to a physical NFC tag
5. Anyone who scans/taps sees the profile instantly — no install required

---

## Features

### MVP (Current)

- ✅ Account sign-up/login (email/password + Google/Apple social login)
- ✅ Profile form: name, phone, LinkedIn, social links (user picks which to add)
- ✅ Auto-generated unique profile URL + QR code
- ✅ Public profile view page (mobile-first, clean, fast-loading) — no login required
- ✅ Edit/update profile anytime from web or mobile
- ✅ Download/share QR code (PNG/SVG)
- ✅ **Mobile-only**: write profile link to NFC tags
- ✅ Deep linking: QR/NFC opens in-app if installed, falls back to web
- ✅ Basic stats: total views + 7/30-day trend (anonymous counts only)

### Not in MVP

- ❌ "Who scanned me" tracking — stats are anonymous by design
- ❌ Social feed or messaging
- ❌ Org/team branding
- ❌ Custom profile themes
- ❌ Phone-to-phone live NFC handshake

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Web frontend** | HTML/CSS/JS (static, migrating to Next.js) | Landing page + public profile pages |
| **Mobile app** | React Native (0.81.0) + Expo (SDK 54) | iOS + Android from one codebase (New Arch enabled) |
| **Backend/API** | Next.js API routes (planned) | REST API for both clients |
| **Database** | PostgreSQL via Supabase (free tier) | Managed, encrypted at rest |
| **Auth** | Supabase Auth | Email/password + Google/Apple sign-in |
| **Web hosting** | Vercel (free tier) | Zero-maintenance HTTPS deploys |
| **Mobile builds** | Expo EAS (free tier) | iOS/Android builds without build servers |
| **QR generation** | `qrcode` npm package | Client-side, no server cost |
| **NFC** | Expo NFC module | Write profile URL to tags |
| **Animations (web)** | GSAP 3 + ScrollTrigger | Scroll-triggered card reveals |
| **3D (web)** | Three.js | Particle background |
| **Scroll (web)** | Lenis | Smooth scrolling |

---

## Project Structure

```
ScanByNexlink/
│
├── index.html              Landing page
├── about.html              About page
├── privacy.html            Privacy policy
├── terms.html              Terms of service
├── support.html            Support + FAQ
├── login.html              Login form (UI placeholder)
├── signup.html             Sign-up form (UI placeholder)
│
├── css/
│   └── styles.css          Full design system + all page styles
│
├── js/
│   ├── app.js              Boot module (inits all systems)
│   ├── lenis.js            Lenis smooth-scroll setup
│   ├── animations.js       GSAP animations (one reusable reveal() fn)
│   ├── scene.js            Three.js particle background
│   └── menu.js             Hamburger mobile menu
│
├── assets/
│   └── logo.svg            ScanByNexlink logo (black + orange)
│
├── mobile-app/             React Native (Expo) mobile app
│   ├── App.js              Entry point
│   ├── app.json            Expo config
│   ├── package.json        Dependencies
│   └── src/
│       ├── screens/        10 screens matching planning docs
│       ├── components/     Reusable UI (Button, Card, Input, Header)
│       ├── theme/          Design tokens
│       ├── navigation/     React Navigation setup
│       └── utils/          API client placeholder
│
├── Planning/               Product docs (read-only reference)
│   ├── 01_product_description.md
│   ├── 02_user_flow.md
│   ├── 03_security_document.md
│   ├── 04_architecture_document.md
│   ├── 05_mobile_screens.md
│   ├── 06_design_system.md
│   └── landing-page.html
│
├── README.md               This file
├── TODO.md                 Next.js migration plan
├── workdone.md             Work tracking log
├── update.md               Changelog
└── .gitignore
```

---

## Getting Started

### Web (Landing Page)

The web frontend is static HTML — no build step required. But ES module imports (Three.js) need a local server:

```bash
# Option 1: npx
npx serve .

# Option 2: Python
python -m http.server 8000
```

Then open `http://localhost:3000` (or `:8000`).

### Mobile App

```bash
cd mobile-app
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android) to preview on your phone.

---

## Design System

The visual identity uses a **dark-first** approach with two accent colors:

| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#141414` | Primary dark background |
| `--accent-coral` | `#FF5A36` | Primary accent — CTAs, active states |
| `--accent-peri` | `#8C97F5` | Secondary accent — alternate cards |
| `--surface-white` | `#FFFFFF` | Elevated data/stat cards |

### Design Principles

- **Two accent hues only** (coral + periwinkle) — never a third
- **Large corner radii** (28–32px on cards, 999px on pills)
- **No drop shadows** — depth comes from color contrast
- **Numbers are the anchor** — set 1.5–2x larger than labels
- **White cards** for data/stats against the dark base

### Typography

- **Headings**: Manrope (weight 700–800)
- **Body**: Inter (weight 400–500)
- Sentence case throughout

---

## Architecture

Designed for ~100 users on free/near-free infrastructure, with a clean upgrade path:

### Data Model

```
users      → id, email, created_at
profiles   → id (public slug), user_id, name, phone
links      → id, profile_id, label, url, sort_order
views      → id, profile_id, link_id (nullable), viewed_at
```

### API Surface

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/profiles` | Required | Create profile |
| GET | `/api/profiles/me` | Required | Get own profile |
| PATCH | `/api/profiles/me` | Required | Update profile |
| DELETE | `/api/profiles/me` | Required | Delete profile + data |
| GET | `/api/p/:slug` | Public | View public profile |
| POST | `/api/p/:slug/link-click` | Public | Track link tap |
| GET | `/api/profiles/me/stats` | Required | View stats |

### Deployment

- **Web + API**: Vercel (auto-deploy from git)
- **Database + Auth**: Supabase (free tier)
- **Mobile**: Expo EAS → TestFlight / Play Console
- **Cost**: ~$0–25/mo (Apple Dev Program is the main cost)

---

## Security & Privacy

Full details in [Planning/03_security_document.md](Planning/03_security_document.md). Key points:

- **Auth delegated to Supabase** — no custom password handling
- **Public API returns only allow-listed fields** — never email or internal IDs
- **View stats are anonymous counts only** — no IP, no device fingerprint, no viewer identity
- **HTTPS everywhere** — including QR/NFC encoded URLs
- **Session tokens** stored securely (Expo SecureStore on mobile)
- **Input validation + XSS prevention** on all user-entered text/links
- **POPIA + GDPR** compliant data handling
- **Account deletion** permanently removes all data

---

## Mobile App

The `mobile-app/` directory contains a React Native (Expo) scaffold with:

### 10 Screens (matching Planning/05_mobile_screens.md)

| Screen | File | Description |
|---|---|---|
| Splash | `SplashScreen.js` | Brand splash, auto-advances |
| Welcome | `WelcomeScreen.js` | Value prop + Get Started/Login |
| Sign Up | `SignUpScreen.js` | Name/email/password form |
| Login | `LoginScreen.js` | Email/password + forgot password |
| Profile Setup | `ProfileSetupScreen.js` | First-run profile form |
| Dashboard | `DashboardScreen.js` | Card preview + quick actions |
| QR Code | `QRCodeScreen.js` | Large QR + share/copy |
| NFC Write | `NFCWriteScreen.js` | Write tag with status states |
| Stats | `StatsScreen.js` | Bar chart + stat boxes |
| Settings | `SettingsScreen.js` | Account, logout, delete |

### Shared Components

Reusable `Button`, `Card`, `Input`, and `Header` components using design tokens that mirror the web CSS variables.

### Status

Currently a **UI scaffold** — navigation structure and screen layouts are complete. Backend integration (Supabase auth, API calls, NFC hardware) is the next step.

---

## Roadmap

See [TODO.md](TODO.md) for the detailed Next.js migration plan.

### Short-term

- [ ] Migrate web frontend to Next.js (SSR, routing, API routes)
- [ ] Wire Supabase Auth on both web and mobile
- [ ] Implement QR code generation (client-side)
- [ ] Build public profile page (`/p/:slug`)

### Medium-term

- [ ] NFC write integration (Expo NFC module)
- [ ] Deep linking configuration (Universal Links + App Links)
- [ ] View stats backend (views table + aggregation endpoint)
- [ ] Deploy to Vercel + submit to app stores

### Future

- [ ] vCard (.vcf) download
- [ ] Custom profile themes
- [ ] Per-link click analytics
- [ ] Expiring/event-specific QR codes

---

## Contributing

This project is in active development. If you'd like to contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes
4. Push and open a Pull Request

---

## License

© 2026 ScanByNexlink. All rights reserved.
