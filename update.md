# ScanByNexlink — Update Log

Running changelog of all updates to the project.

---

## v0.2.0 — 2026-08-12

**Phase 2: Rebrand, Multi-page Website, Full Mobile App Scaffold & Migration Docs**

### Added
- **Rebrand:** Rebranded project to **ScanByNexlink** across all pages, titles, footers, and code comments.
- **Logo:** Custom SVG logo (`assets/logo.svg`) with black QR corner brackets and orange NFC wave.
- **Mobile Menu:** Fullscreen slide-from-right hamburger menu for screens `<840px` with GSAP animations and Lenis scroll lock.
- **New Web Pages:**
  - `about.html` — Vision, product description, and tech stack details.
  - `privacy.html` — Comprehensive privacy policy (POPIA/GDPR compliant, anonymous stats disclosure).
  - `terms.html` — SaaS terms of service.
  - `support.html` — Interactive FAQ accordions and support channels.
  - `login.html` — Login screen UI.
  - `signup.html` — Sign-up screen UI.
- **React Native Mobile App (`mobile-app/`):**
  - Full Expo project setup (`package.json`, `app.json`, `babel.config.js`).
  - Modular theme system matching web design tokens (`tokens.js`).
  - Shared UI components (`Button`, `Card`, `Input`, `Header`).
  - Stack + Tab Navigation setup (`AppNavigator.js`).
  - All 10 screens from planning (`SplashScreen`, `WelcomeScreen`, `LoginScreen`, `SignUpScreen`, `ProfileSetupScreen`, `DashboardScreen`, `QRCodeScreen`, `NFCWriteScreen`, `StatsScreen`, `SettingsScreen`).
- **Documentation:**
  - Extensive project `README.md`.
  - Detailed Next.js migration strategy in `TODO.md`.

---

## v0.1.0 — 2026-08-12

**Phase 1: Landing Page (Static HTML/CSS/JS)**

### Added
- Landing page with all sections: hero, how-it-works, features, stats, CTA, footer
- GSAP ScrollTrigger animations on cards, steps, and stats
- Three.js particle background (120 coral + periwinkle dots)
- Lenis smooth scrolling
- Responsive design and `prefers-reduced-motion` support
