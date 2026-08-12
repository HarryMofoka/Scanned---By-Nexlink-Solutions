# TapShare — Work Done Log

All completed work items, tracked in reverse chronological order.

---

## 2026-08-12 — Landing Page Build (v1)

### Files Created

| File | Purpose |
|---|---|
| `index.html` | Main landing page entry point |
| `css/styles.css` | Full design system + all layout styles |
| `js/app.js` | Boot module — initialises Lenis, GSAP, and Three.js |
| `js/lenis.js` | Lenis smooth-scroll setup, integrated with GSAP ticker |
| `js/animations.js` | All GSAP ScrollTrigger animations via one reusable `reveal()` function |
| `js/scene.js` | Three.js floating particle background (coral + periwinkle) |
| `.gitignore` | Standard ignore rules |
| `workdone.md` | This file — work tracking |
| `update.md` | Changelog |

### Architecture Decisions

- **No build step** — all libraries loaded via CDN (GSAP, Lenis as UMD globals; Three.js via importmap). Zero npm dependencies.
- **One `reveal()` function** — drives all card/step/stat entrance animations across the page. Called with different selectors instead of writing separate animation code per section.
- **Modular JS** — 4 files, each under 90 lines, single responsibility (scroll, animations, 3D scene, boot).
- **CSS extracted** — identical to reference `Planning/landing-page.html` styles, moved to its own file for maintainability.
- **HTML structure preserved** — matches the planning HTML exactly (content, class names, sections).

### Libraries Used

| Library | Version | Method | Purpose |
|---|---|---|---|
| GSAP | 3.12.7 | CDN global | Scroll-triggered card animations |
| ScrollTrigger | 3.12.7 | CDN global | GSAP plugin for scroll-based triggers |
| Three.js | 0.170.0 | importmap ES module | Particle background canvas |
| Lenis | 1.1.18 | CDN global | Smooth scrolling |
