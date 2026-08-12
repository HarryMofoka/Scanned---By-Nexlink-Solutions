# TapShare — Update Log

Running changelog of all updates to the project.

---

## v0.1.0 — 2026-08-12

**Landing Page (Static HTML/CSS/JS)**

### Added
- Landing page with all sections: hero, how-it-works, features, stats, CTA, footer
- Phone mockup with QR code and NFC card UI in hero section
- GSAP ScrollTrigger animations on all cards, steps, and stats
- Hero entrance timeline animation with staggered reveals
- Floating notification badges with gentle continuous animation
- Three.js particle background (120 coral + periwinkle dots)
- Lenis smooth scrolling integrated with GSAP ticker
- Responsive design (mobile-first, breakpoints at 600/640/700/760/840/900/1000px)
- `prefers-reduced-motion` support — all animations disabled when user prefers
- SEO meta tags (title, description, theme-color)
- Work tracking (`workdone.md`) and changelog (`update.md`)

### Tech Stack
- HTML5, CSS3, vanilla JavaScript (ES modules)
- GSAP 3.12.7 + ScrollTrigger (CDN)
- Three.js r170 (importmap)
- Lenis 1.1.18 (CDN)
- No build step, no npm, zero dependencies
