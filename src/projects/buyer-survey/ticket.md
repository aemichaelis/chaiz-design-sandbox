# Buyer Survey — post-purchase (marketplace users)

## Goal

Understand where our customers came from, what drives their decisions, and how they perceive where the value of Chaiz lies — and understand our personae better.

## Problem

We have very little insight into what drives organic users AND what makes them buy on Chaiz. We have anecdotal insights from Erick / listening to phone calls but this is only with people that actually call, so a small subset with certain traits.

Second, even for customers where we get some attribution, the understanding about value etc is not available.

## Out of scope

- Only show to marketplace users — not users that came via Savvy or Consumer Affairs
- No conditional branching except the Q2 competitor drill-down
- No ranking or drag-to-sort question types
- No incentive testing
- No A/B testing question order or option sets

## Survey Questions / Design

**General brief:**

- Orient design strongly on Airbnb (see BFM) — one question per tab/panel
- Small progress indicator, never show more than 1/3 even if there are more (avoid abandon rates)
- Front-load our highest value questions
- Auto-save each answer on tap (partial completions still yield data)
- Randomise option order on all questions (except "Other," which stays last) to avoid positional bias
- Questions and answers should be editable via Growthbook

### Q1 — Source attribution [required, single-select]

"How did you first hear about Chaiz?"

Options (radio, not checkbox):
- Google search
- Reddit
- YouTube
- ChatGPT / AI recommendation
- Online article or review
- Friend or family recommendation
- Insurance agent or dealer told me about it
- Social media (Facebook, Instagram)
- Saw an ad
- On TV (non-existing honeypot — error-rate check)
- Other (opens short text field)

Notes:
- Deliberately required. Gates the rest — curiosity principle ("see what's next").
- Radio, not checkbox, so we can make budgeting decisions cleanly.
- First touchpoint, not last click.
- **Known-source skip:** users with clear UTM (CRC, Impact affiliates, branded SEM, etc.) skip Q1. Log UTM as attribution, start at Q2. Higher expected completion on Q2–Q5 for these.
- Config list lives in Growthbook.

### Q2 — Competitive landscape + persona signal [optional, single select]

"What were you thinking about doing before you chose Chaiz?"

- Another warranty company (Endurance, CarShield, CARCHEX, etc.)
- Extended warranty from my dealer
- Saving up for repairs on my own
- I wasn't sure I needed a warranty at all
- Nothing — Chaiz was my first choice

(Not essential for v1) Conditional follow-up on "Another warranty company" — multi-select chips: Endurance / CarShield / CARCHEX / Protect My Car / Olive / Toco / Other.

### Q3 — Decision driver [optional, select max three]

"What mattered most in your decision to buy through Chaiz?" (Choose up to 3)

- Price
- Being able to compare plans from different providers
- Knowing exactly what's covered and what's not
- Reviews and ratings of providers
- Being able to buy online without speaking to a salesperson
- Ease of the purchase process
- The company I chose is well-known and trusted
- The plan I wanted was only available on Chaiz

### Q4 — Product features [optional, select max three]

Mid-survey encouragement above Q4: "Almost there, 2 more" — disappears on first tap.

"What was most helpful in making your decision?" (Choose up to 3)

- Coverage scores and ratings for each plan
- Expert recommendations
- Quiz and personalised results
- Filters on the results page
- Being able to download the full contract before buying
- Contract details (coverage, limits, benefits)
- Add-ons and benefits clearly listed

### Q5 — Experience feedback + NPS-lite [optional]

"How was your buying experience?" (5-star)

- 4–5 stars: "Glad to hear it! Anything we should keep doing?" (optional 1–2 line text)
- 1–3 stars: "We want to do better. What could we improve?" (optional 1–2 line text)

## Post-survey completion

After Q5 submission (or dismissal at any point):

> "Thanks for sharing. Your answers help us make Chaiz better."

CTA: **[Log in to your client area →]** — "View your contract details, track your coverage, and see what's next."

## Metrics (est. completion)

| Q | Completion |
| --- | --- |
| 1 | 45–55% |
| 2 | 35–45% |
| 3 | 28–38% |
| 4 | 22–32% |
| 5 | 15–25% star, 3–8% text |

## Persona mapping (hypothesis to validate)

Inferred from Q1 + Q2 combinations:

| Q2 | Q1 pattern | Likely persona |
| --- | --- | --- |
| "Another warranty company" / "Dealer warranty" | Google search, review site, Reddit | Self-Directed Value Buyer |
| "I wasn't sure I needed a warranty at all" | Any | Category Skeptic |
| "Setting aside money for repairs" | Google search, AI recommendation | Category Skeptic (analytical) |
| "Nothing — Chaiz was first choice" | Friend/family, dealer referral | High-intent referral |

## Data storage

- **Mixpanel** — one `Survey answer` event per question with answer(s) and position(s). Leverages Mixpanel for drop-offs and correlations.
- **Hubspot** — answers probably wanted here too but placement TBD (Georgi input).
