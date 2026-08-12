# Mobile App — Screen Inventory (v1)

Visual design note: all screens below follow the Design System Document — dark base (`#141414`), coral (`#FF5A36`) as primary accent, periwinkle (`#8C97F5`) as secondary accent, white cards for stats/data content, 28–32px corner radii, no drop shadows or gradients.

Stats is now formally in MVP scope — see the Product Description, User Flow (Flow D), Architecture (`views` table + endpoints), and Security (section 8) documents, all updated to match. It's kept deliberately minimal: anonymous counts only, no Viewer identity ever tracked.

---

## A. Onboarding Flow

**1. Splash Screen**
- App logo/wordmark, brief tagline ("Your contact card, one tap away").
- Auto-advances to Welcome after ~1s or on load complete.

**2. Welcome / Value Prop Screen**
- 2–3 swipeable panels (or a single screen if you want to keep it lean): "Share your contact info with a tap," "One QR code, always up to date," "No app needed for people you share with."
- Primary CTA: "Get Started." Secondary: "Log In" (for returning users).
- Skippable — don't force users through slides.

**3. Sign Up Screen**
- Email + password fields, or "Continue with Google" / "Continue with Apple" buttons (Apple sign-in required by App Store guidelines if Google is offered).
- Link to Log In for existing users.
- Inline validation (password strength, email format) — no jarring after-submit errors.

**4. Log In Screen**
- Email + password, social login buttons, "Forgot password?" link.
- Handled by Supabase Auth — no custom logic, just the UI shell.

**5. Profile Setup Screen** (first-run only, right after signup)
- Name field (required).
- Phone field (optional, with a short explainer: "Shown as tap-to-call on your profile").
- "Add a link" repeatable row: platform picker (LinkedIn, Instagram, X, WhatsApp, Website, Other) + URL field.
- Primary CTA: "Create my card" — disabled until at least one contact method is filled (matches the empty-profile edge case from the User Flow doc).

**6. Card Created / Success Screen**
- Confetti-style light celebration moment (production polish detail — makes account creation feel like an accomplishment, not just a form submit).
- Shows the freshly generated QR code preview.
- CTA: "View my card" → goes to the Home/Dashboard.

---

## B. Home / Dashboard

**7. Dashboard (Home tab)**
- Card preview at top: mini version of the public profile (name, avatar/initial, contact icons).
- Quick actions: "View QR code," "Share my card," "Edit profile."
- If Stats is included: a compact stats summary card ("12 views this week") that taps through to the full Stats screen.
- Bottom tab bar: Home, QR Code, Stats, Settings (4 tabs keeps it simple — resist adding more).

**8. Edit Profile Screen**
- Same layout as Profile Setup, pre-filled.
- Save button, with a subtle "Saved" confirmation toast rather than a full-screen success state (production feel: don't over-interrupt for routine edits).
- Delete account option lives here too, but tucked at the bottom, requiring a confirmation dialog — never a one-tap destructive action.

---

## C. QR / NFC Screens

**9. QR Code Screen**
- Large, centered QR code — this is the screen people will hold up to someone else's camera, so it needs to be big, high-contrast, and legible even at low brightness.
- Below it: the raw profile link as text (fallback for anyone who can't scan) and a "Copy link" button.
- Actions: "Save to Photos," "Share" (native share sheet — lets them AirDrop/text the QR image directly).
- Auto-brightness boost: bump screen brightness while this screen is open (a nice production-polish touch — makes scanning more reliable in dim rooms).

**10. NFC Write Screen**
- Instructional state: "Hold your phone near a blank NFC tag" with a simple animation (phone icon pulsing near a tag icon).
- Success state: checkmark + "Tag programmed!" confirmation.
- Error state: clear retry messaging if the tag is out of range or read-only (matches the edge case in the User Flow doc) — never fail silently.

**11. Scanned Profile View (Viewer-side, in-app)**
- This is what opens when someone *with the app* scans/taps another Creator's code (deep link case from the User Flow doc).
- Shows the Creator's name, tap-to-call, and link buttons — same content as the public web page, styled natively.
- Prompt at the bottom: "Get your own card" if the Viewer doesn't have an account yet — a natural, non-pushy growth loop.

---

## D. Stats (if included)

**12. Stats Screen**
- Total views (all-time) and a simple trend — a small line/bar chart of views over the last 7/30 days is plenty; avoid building a full analytics dashboard.
- Optional: link-click breakdown ("LinkedIn: 8 clicks, Instagram: 3 clicks") if you're tracking per-link taps — nice-to-have, not essential for v1 of this screen.
- No need for date-range pickers, exports, or filters at this scale — keep it to "here's how your card is doing" at a glance.

---

## E. Settings

**13. Settings Screen**
- Account info (email, change password).
- Log out.
- Privacy policy / terms links.
- Delete account (secondary entry point, same confirmation flow as in Edit Profile).
- App version number (small, bottom of screen — standard production polish detail).

---

## Screen Flow Summary
```
Splash → Welcome → [Sign Up | Log In] → Profile Setup → Success
                                                              |
                                                              v
                    Dashboard (Home) <—— tab bar ——> QR Code —— NFC Write
                         |                                |
                         v                                v
                  Edit Profile                    Scanned Profile View (viewer-side)
                         |
                         v
                     Settings

Dashboard <—— tab bar ——> Stats
```

## Design Polish Notes (things that make it feel "production," not MVP)
- Consistent empty/loading/error states on every screen that fetches data (Dashboard, Stats) — a blank white screen during load reads as broken, not polished.
- Skeleton loaders instead of spinners for the Dashboard and Stats screens.
- Haptic feedback on key actions (QR generated, NFC write success, profile saved) — cheap to add via Expo Haptics, disproportionately improves perceived quality.
- One consistent design system (spacing, type scale, color tokens) applied across all 13 screens rather than styling each screen ad hoc — worth setting up a small shared theme file early.
