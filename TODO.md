# TODO — Next.js Migration Plan

> **Status:** Planning only. No migration has been started yet. This document outlines the step-by-step approach for when you're ready to migrate.

---

## Why Migrate to Next.js

The current site is static HTML/CSS/JS — fast to build, zero dependencies, but limited:

| Current (Static) | Next.js |
|---|---|
| No routing — separate `.html` files | File-based routing (`/pages` or `/app`) |
| No SSR — client-side only | Server-Side Rendering for fast first paint |
| No API routes — need separate backend | Built-in API routes (`/api/*`) |
| No component reuse — nav/footer duplicated | React components shared across pages |
| Manual SEO per page | Automatic `<Head>` management per route |
| CDN scripts — GSAP, Three.js, Lenis globals | npm packages — tree-shaken, versioned |
| No image optimization | `next/image` with automatic optimization |

### Key Benefits

1. **API routes replace a separate backend** — Supabase calls, profile CRUD, stats, all inside the same project
2. **SSR for public profiles** — `/p/:slug` pages render server-side for instant load + SEO
3. **Shared layout** — nav, footer, Three.js canvas, and Lenis scroll defined once
4. **Incremental migration** — can coexist with static files during transition

---

## Step-by-Step Migration Path

### Phase 1: Project Setup

1. Init Next.js in the root:
   ```bash
   npx -y create-next-app@latest ./ --typescript --tailwind=false --eslint --app --src-dir --import-alias "@/*"
   ```
   > Note: Use `--tailwind=false` since we're using our own CSS system

2. Move existing CSS:
   - Copy `css/styles.css` → `src/styles/globals.css`
   - Import in `src/app/layout.tsx`

3. Install dependencies:
   ```bash
   npm install gsap lenis three @supabase/supabase-js qrcode
   ```

### Phase 2: Shared Layout

1. Create `src/app/layout.tsx` with:
   - `<html lang="en">` with theme-color meta
   - Google Fonts via `next/font`
   - Global CSS import
   - Shared `<Nav />` and `<Footer />` components
   - Three.js `<canvas>` component
   - Lenis scroll provider

2. Create shared components:
   ```
   src/components/
   ├── Nav.tsx          (nav + hamburger menu)
   ├── Footer.tsx       (footer links)
   ├── Logo.tsx         (SVG logo)
   ├── ParticleCanvas.tsx (Three.js scene)
   └── ScrollProvider.tsx (Lenis init)
   ```

### Phase 3: Page Migration

Map existing HTML files to Next.js routes:

| Current File | Next.js Route | File |
|---|---|---|
| `index.html` | `/` | `src/app/page.tsx` |
| `about.html` | `/about` | `src/app/about/page.tsx` |
| `privacy.html` | `/privacy` | `src/app/privacy/page.tsx` |
| `terms.html` | `/terms` | `src/app/terms/page.tsx` |
| `support.html` | `/support` | `src/app/support/page.tsx` |
| `login.html` | `/login` | `src/app/login/page.tsx` |
| `signup.html` | `/signup` | `src/app/signup/page.tsx` |
| *(new)* | `/p/[slug]` | `src/app/p/[slug]/page.tsx` |

Each page becomes a React component that returns the same JSX as the current HTML body content (minus nav/footer, which are in the layout).

### Phase 4: API Routes

Create API endpoints in `src/app/api/`:

```
src/app/api/
├── profiles/
│   ├── route.ts              POST: create profile
│   └── me/
│       ├── route.ts          GET/PATCH/DELETE: own profile
│       └── stats/
│           └── route.ts      GET: view stats
└── p/
    └── [slug]/
        ├── route.ts          GET: public profile + view logging
        └── link-click/
            └── route.ts      POST: track link tap
```

### Phase 5: Supabase Integration

1. Create `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
   ```

2. Create `src/lib/supabase.ts` — client + server helpers

3. Wire auth:
   - Login/signup pages call Supabase Auth
   - Middleware checks session for protected routes
   - Public profile pages (`/p/:slug`) need no auth

### Phase 6: GSAP + Three.js Integration

- GSAP: Import as npm package, use `useGSAP` hook or `useLayoutEffect`
- Three.js: Wrap in a client component (`'use client'`)
- Lenis: Create a `ScrollProvider` context component
- All animation code from `js/animations.js` ports directly — same `reveal()` function, just called inside `useEffect`

### Phase 7: Cleanup

1. Delete static HTML files (`index.html`, `about.html`, etc.)
2. Delete `css/` and `js/` directories (now in `src/`)
3. Update `package.json` scripts
4. Update `.gitignore` for Next.js (`.next/`, `out/`)
5. Configure Vercel deployment

---

## Dependencies Needed

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.45.0",
    "gsap": "^3.12.0",
    "lenis": "^1.1.0",
    "three": "^0.170.0",
    "qrcode": "^1.5.0"
  }
}
```

---

## Estimated Effort

| Phase | Effort | Notes |
|---|---|---|
| Setup + layout | ~2 hours | Init project, shared components |
| Page migration | ~3 hours | 8 pages, mostly moving HTML to JSX |
| API routes | ~4 hours | 7 endpoints, Supabase integration |
| Auth wiring | ~3 hours | Login, signup, session middleware |
| GSAP/Three.js/Lenis | ~2 hours | Port existing code to React hooks |
| Cleanup + deploy | ~1 hour | Remove old files, Vercel config |
| **Total** | **~15 hours** | |

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| GSAP ScrollTrigger doesn't play well with React hydration | Use `'use client'` components + `useLayoutEffect` |
| Three.js SSR errors (no `window`) | Dynamic import with `ssr: false` |
| Lenis conflicts with Next.js scroll restoration | Disable Next.js scroll restoration, let Lenis handle it |
| Breaking existing QR codes | Keep `/p/:slug` URL structure identical |

---

## References

- [Next.js App Router docs](https://nextjs.org/docs/app)
- [Supabase + Next.js guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [GSAP + React guide](https://gsap.com/resources/React)
- Planning docs: `Planning/04_architecture_document.md`
