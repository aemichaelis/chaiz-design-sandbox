import { useState } from 'react'
import { motion } from 'framer-motion'

const Q1_OPTIONS = [
  'Google search',
  'Reddit',
  'YouTube',
  'ChatGPT / AI recommendation',
  'Online article or review',
  'Friend or family recommendation',
  'Insurance agent or dealer told me about it',
  'Social media (Facebook, Instagram)',
  'Saw an ad',
  'On TV',
  'Other',
]

// ──────────────────────────────────────────────────────────
// Shared dark-surface card frame
function DarkCard({
  children,
  topRight,
}: {
  children: React.ReactNode
  topRight?: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl px-6 py-6 relative"
      style={{ background: 'var(--card-background)', color: '#fff' }}
    >
      {topRight && <div className="absolute top-4 right-4">{topRight}</div>}
      {children}
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// A single-column pill option
function Pill({
  label,
  selected,
  pulsing = false,
  onClick,
}: {
  label: string
  selected: boolean
  pulsing?: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      animate={
        pulsing && !selected
          ? {
              boxShadow: [
                '0 0 0 0px rgba(34,239,141,0)',
                '0 0 0 4px rgba(34,239,141,0.35)',
                '0 0 0 0px rgba(34,239,141,0)',
              ],
            }
          : { boxShadow: '0 0 0 0px rgba(0,0,0,0)' }
      }
      transition={{ duration: 1.6, repeat: pulsing ? Infinity : 0 }}
      className={`w-full text-left rounded-xl px-4 py-3 font-semibold text-foreground transition-colors ${
        selected
          ? 'bg-[color:var(--color-glow-200)]'
          : 'bg-white hover:bg-[color:var(--color-glow-50)]'
      }`}
    >
      {label}
    </motion.button>
  )
}

// ──────────────────────────────────────────────────────────
// Variant A — no cue, pills speak for themselves
function VariantA() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DarkCard>
      <h3 className="text-2xl font-semibold mb-5 leading-tight">
        How did you first hear about Chaiz?
      </h3>
      <div className="space-y-2">
        {Q1_OPTIONS.map((opt) => (
          <Pill
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => setSelected(opt)}
          />
        ))}
      </div>
    </DarkCard>
  )
}

// ──────────────────────────────────────────────────────────
// Variant B — subtle inline hint under the heading
function VariantB() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DarkCard>
      <h3 className="text-2xl font-semibold leading-tight">
        How did you first hear about Chaiz?
      </h3>
      <p className="text-sm opacity-70 mt-1 mb-5">
        Tap one to begin · auto-advances
      </p>
      <div className="space-y-2">
        {Q1_OPTIONS.map((opt) => (
          <Pill
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => setSelected(opt)}
          />
        ))}
      </div>
    </DarkCard>
  )
}

// ──────────────────────────────────────────────────────────
// Variant C — pulse glow on the first option
function VariantC() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DarkCard>
      <h3 className="text-2xl font-semibold mb-5 leading-tight">
        How did you first hear about Chaiz?
      </h3>
      <div className="space-y-2">
        {Q1_OPTIONS.map((opt, i) => (
          <Pill
            key={opt}
            label={opt}
            selected={selected === opt}
            pulsing={i === 0 && selected === null}
            onClick={() => setSelected(opt)}
          />
        ))}
      </div>
    </DarkCard>
  )
}

// ──────────────────────────────────────────────────────────
// Variant D — top-right meta chip ("Quick · 5 questions"), no overlay cue
function VariantD() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DarkCard
      topRight={
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          Quick · 5 questions
        </span>
      }
    >
      <h3 className="text-2xl font-semibold pr-32 mb-5 leading-tight">
        How did you first hear about Chaiz?
      </h3>
      <div className="space-y-2">
        {Q1_OPTIONS.map((opt) => (
          <Pill
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => setSelected(opt)}
          />
        ))}
      </div>
    </DarkCard>
  )
}

// ──────────────────────────────────────────────────────────
// Variant E — animated arrow next to heading
function VariantE() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DarkCard>
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-2xl font-semibold leading-tight">
          How did you first hear about Chaiz?
        </h3>
        {selected === null && (
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="text-xl shrink-0"
            style={{ color: 'var(--color-glow-300)' }}
          >
            ↓
          </motion.span>
        )}
      </div>
      <div className="space-y-2">
        {Q1_OPTIONS.map((opt) => (
          <Pill
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => setSelected(opt)}
          />
        ))}
      </div>
    </DarkCard>
  )
}

// ──────────────────────────────────────────────────────────
function Wrap({
  title,
  caption,
  children,
}: {
  title: string
  caption: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-base font-semibold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{caption}</div>
      </div>
      <div className="max-w-[460px]">{children}</div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
export default function Q1CardExplorations() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Q1 card explorations
        </h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-prose">
          Single-column dark-surface pills, with five different takes on the
          "where do I begin?" cue. Pick one to take forward into the main flow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Wrap
          title="A — No cue"
          caption="Pills are obviously tappable. Trust the affordance, no overlay needed."
        >
          <VariantA />
        </Wrap>

        <Wrap
          title="B — Inline hint"
          caption="Subtle muted line under the heading. Cheap, honest, doesn't overlap content."
        >
          <VariantB />
        </Wrap>

        <Wrap
          title="C — Pulse on first option"
          caption="Animated glow draws the eye to a starting point without blocking anything."
        >
          <VariantC />
        </Wrap>

        <Wrap
          title="D — Meta chip top-right"
          caption='"Quick · 5 questions" sets expectation, doubles as a subtle CTA.'
        >
          <VariantD />
        </Wrap>

        <Wrap
          title="E — Arrow next to heading"
          caption="Bouncing arrow that disappears on first selection. Playful but minimal."
        >
          <VariantE />
        </Wrap>
      </div>
    </div>
  )
}
