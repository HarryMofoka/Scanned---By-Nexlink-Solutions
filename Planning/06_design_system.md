# Design System Document

Source: reference UI screens (fitness app mockups) — adopted as TapShare's visual identity across web and mobile.

## 1. Color Tokens

| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#141414` | App background (dark mode primary surface) |
| `--bg-card-dark` | `#1E1E1E` | Secondary dark surfaces, nav bars |
| `--accent-coral` | `#FF5A36` | Primary accent — main CTAs, active states, primary data viz |
| `--accent-coral-deep` | `#B23A22` | Coral gradient/chart shading, pressed states |
| `--accent-periwinkle` | `#8C97F5` | Secondary accent — secondary cards, alternate CTAs |
| `--surface-white` | `#FFFFFF` | Elevated stat/content cards on dark backgrounds |
| `--text-on-dark` | `#FFFFFF` | Text on `--bg-base` / coral / periwinkle |
| `--text-on-dark-muted` | `#B3B3B3` | Secondary text on dark backgrounds |
| `--text-on-light` | `#141414` | Text on white cards |
| `--text-on-light-muted` | `#6B6B6B` | Secondary text on white cards |

Only two accent hues in rotation (coral, periwinkle) — never introduce a third accent color. White cards act as the neutral "data" surface against the dark base, the same role gray plays in most systems, but with more contrast and confidence.

## 2. Typography
- **Display/headline**: bold, rounded-terminal sans-serif (e.g. SF Pro Rounded, or 'General Sans'/'Cabinet Grotesk' as web equivalents) — used for big numbers and short headlines. Weight 600–700 only.
- **Body**: a plain grotesk (Inter or SF Pro) at weight 400–500 for supporting text, labels, timestamps.
- Numbers are always the visual anchor of a card — set 1.5–2x larger than the label above/below them (e.g. "75%", "62", "400").
- Sentence case throughout, no ALL CAPS except tiny eyebrow labels if ever needed (this system mostly avoids them).

## 3. Shape & Layout
- **Corner radius**: large and consistent — 28–32px on primary cards, 20px on nested pills/buttons, fully round (999px) on avatar circles and icon badges.
- **No drop shadows, no gradients on flat fills** — the only "shadow" in the reference is the device mockup itself. Depth comes from color contrast (white card floating on dark base), not elevation effects.
- **Card grid**: two-column card pairs (e.g. coral + periwinkle side by side) sit above a full-width white summary card — a consistent rhythm of "two small + one large" that reads well on mobile.
- **Icon treatment**: icons sit inside solid circular badges (black on coral, coral on white) rather than floating bare — gives every card a consistent anchor point in its top-left or left edge.

## 4. Components
- **Primary card** (coral or periwinkle fill, white text): used for the main call-to-action or the most important piece of info on screen — one per view.
- **White data card**: used for stats, summaries, progress — black text, thin colored accents only (e.g. an orange progress ring), never colored fills.
- **Progress ring**: colored arc (coral) over a light-gray track, percentage centered — used wherever a completion state matters (matches the "Leg Day 75%" and "Statistics" screens).
- **Pill buttons**: white bg / black text as default, colored fill only for the single primary action per screen (matches "Start" button with black play-icon circle).
- **Chart bars**: coral-to-deep-coral gradient per bar, one bar highlighted solid black to mark a peak/highlight value — a nice pattern for calling out "today" or "your best."

## 5. Applying This to TapShare
Mapping the reference system onto TapShare's actual screens (see Mobile Screens document):
- **Dashboard**: dark base, profile summary in a two-card coral/periwinkle pair (e.g. coral = "Your card," periwinkle = "Quick share"), white stat card below for view counts — directly mirrors the reference's Workout Plan / Cardio / Leg Day layout.
- **QR Code screen**: QR code sits on a white card (best scan contrast) floating on the dark base — coral accent only on the "Save/Share" pill buttons.
- **Stats screen**: coral bar chart for views-per-day (matches the "Steps per minute" reference chart exactly in spirit), white summary cards for total views / achieved goals, periwinkle for a secondary metric card.
- **Onboarding/Profile Setup**: dark base throughout, coral as the single primary CTA color ("Create my card"), periwinkle reserved for a secondary "Skip for now" or informational card.

## 6. Web Landing Page Extension
The same tokens carry directly to web — dark base, coral/periwinkle two-accent system, large rounded cards, bold rounded display type for headline numbers/claims, white cards for feature/proof content. See the landing page implementation for the applied version.

## 7. Accessibility Notes
- White text on coral (`#FF5A36`) and periwinkle (`#8C97F5`) both meet AA contrast for large text (18px+/bold) — keep body-size text on colored fills to a minimum, prefer white cards for dense text.
- Maintain visible focus states (a white or coral outline ring) on all interactive elements for keyboard navigation on web — the reference mockups don't show this since they're static, but it's required for the production build.
- Respect `prefers-reduced-motion` for any card entrance animations or progress-ring fill animations.
