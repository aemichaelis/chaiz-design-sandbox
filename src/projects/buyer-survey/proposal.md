# Buyer Survey — proposal

## Pushback

- **"Capped at 3/3 even when there are 5 questions"** — doing this means users on Q5 still see "3/3" even though they could quit. Trades honesty for completion; worth it, but name it explicitly in the Growthbook copy doc.
- **"On TV" honeypot** — works, but only detects careless answers, not bots. Cheap to include, don't overclaim what it proves.
- **Post-submission "Log in" CTA** — implies user isn't logged in on TY page. Worth confirming with the checkout team before we bake it in.

## Solution shape

1. TY page with confirmation + order summary + survey card + next steps
2. Survey card **starts collapsed** with a short teaser ("~60 sec, helps us help others") — click to expand
3. Expanded card shows one question per panel, Airbnb-style — auto-advance on tap for single-select (Q1, Q2), "Next" button for multi-select (Q3, Q4) and rating (Q5)
4. Progress bar caps at 3 segments visually: 1/3 → 2/3 → 3/3 → 3/3 → 3/3
5. "Almost there, 2 more" microcopy above Q4, dismissed on first tap
6. Completion state: thank-you message + primary CTA to client area
7. Debug: a toggle at the top of the prototype flips between **Unknown source** (5 questions, Q1 required) and **Known UTM** (4 questions, skips Q1)

## Out of scope in this prototype

- Real Growthbook / Mixpanel / Hubspot wiring — faked with inline constants and `console.log`
- Q2 competitor drill-down (ticket marks as non-v1)
- Mobile layout (user specified desktop-first)
- Animations beyond basic expand/collapse and panel fade
- Accessibility pass (focus rings, ARIA roles) — basic but not audited
