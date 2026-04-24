# Proposal — thank-you-survey-v2

**Pushback:** None. Scope is well-defined.

## Solution shape

- Single component with a local state machine: `step ∈ { teaser, 1..5, done }`. Answers, shuffled-order arrays, and transient UI flags (error pulse, Q4 microcopy visibility) kept in component state — resets on Restart.
- Framer Motion `AnimatePresence mode="wait"` for inter-question slide+fade. Next = slide-in-from-right, Back = slide-in-from-left (direction tracked in state).
- Accordion teaser uses `motion.div` with height: "auto" / 0. Q1 "Other" input expands the same way.
- Randomisation: shuffle Q3 and Q4 options **once on mount** via `useMemo` keyed to a mount-nonce that changes only on Restart — stable within a session, fresh after reset.
- Q3/Q4 "max 3": hard-disable unchecked rows when 3 selected; micro-shake on disabled click via a per-row `shakeKey` state bump.
- Desktop/Mobile toggle: reads & writes `?view=` via `useSearchParams`. Mobile wraps the page in a 375px phone-frame mock (rounded 40px, border, shadow). Desktop just centres at 560px.
- Abstracted thank-you page chrome: confirmation hero + one contract stub row + survey teaser. Not a pixel-faithful rebuild.
- Restart button: fixed bottom-right, small pill, bumps the mount-nonce → everything resets.

## Out of scope

- Routing between steps (all local state — URL only stores `view`)
- Persisting answers anywhere (no backend, no localStorage)
- Known-UTM skip logic (ticket notes it lives in growthbook — pre-prototype concern)
- Post-renewal variant (separate flow — covered in the design review, not this prototype)
- Back button on Q2–Q5 (ticket review item, still open — can add in v2)
- "On TV" decoy telemetry wiring (analytics concern)

## Open questions (defer until someone clicks through)

- Should Back be enabled? (Design review still open)
- Is the teaser *always* collapsed on page load, or expanded if the user hasn't dismissed it? (Default: always collapsed)
- Is there a "skip survey" / dismiss affordance? Currently no close-X on the teaser.
