---
source: Figma OR9xH3M3ibx5p9yE6P39x1 (Round 2 section 4024:289)
date: 2026-04-24
---

# Post-purchase survey v2 (thank-you page)

Build an interactive prototype of the 5-question post-purchase survey that lives on the Checkout Thank-you page. Desktop + mobile, with a top-right view switch.

## Flow steps

1. **Thank-you page base** — compact/abstracted Checkout Thank-you template (hero confirmation + contract stub + survey teaser below).
2. **Survey teaser** — collapsed accordion card (mint bg, "HELP US HELP OTHERS" eyebrow, heading "Quick 5-question survey · ~60 seconds", description "Answer 5 quick questions to shape what we build — in under 60 seconds.", chevron-down). On click → expand.
3. **Q1 — Source attribution** (required, single-select radio). 11 options including "On TV" (error-rate decoy) and "Other (opens short text field)". Step "1 of 5". If Next tapped without selection → red pulse + inline error. If "Other" selected → text input reveal with "Max 120 characters" hint.
4. **Q2 — Competitive landscape** (optional, single-select). 5 options. Step "2 of 5".
5. **Q3 — Decision driver** (optional, multi-select max 3, checkboxes, randomised order). Helper "Choose up to 3". 8 options. Step "3 of 5".
6. **Q4 — Product features** (optional, multi-select max 3, randomised). Helper "Choose up to 3". 7 options. "Almost there, 2 more" microcopy above card (disappears on first tap inside card). Step "4 of 5".
7. **Q5 — NPS-lite** (optional). 5-star row. Conditional follow-up prompt (4–5 stars positive / 1–3 stars improvement) + optional short text input. Step "5 of 5".
8. **Thank-you completion** — "Thanks for sharing." + sub-copy + "Log in to your client area →" CTA.

## Animations

- Accordion teaser expands (height + opacity)
- Inter-question slide + fade (AnimatePresence mode="wait")
- Progress bar under Next button fills left→right
- Q1 error: red border pulse
- Q1 "Other" text field: animated expand
- Q3 "max 3": disabled rows + micro-shake on disabled click
- Q5 stars: scale/fill on hover/tap
- Q4 microcopy: fade in → fade out on first card tap
- Final completion card: check-mark scale in, text cascades

## Desktop / Mobile switch

- Top-right segmented toggle (Desktop / Mobile)
- URL param `?view=desktop|mobile`
- Desktop: ~560px card, centred in a simulated page chrome
- Mobile: 375px phone-frame mock, card fills width
