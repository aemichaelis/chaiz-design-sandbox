import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
function DarkCard({
  children,
  topRight,
}: {
  children: React.ReactNode
  topRight?: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl px-5 py-5 relative"
      style={{ background: 'var(--card-background)', color: '#fff' }}
    >
      {topRight && <div className="absolute top-4 right-4">{topRight}</div>}
      {children}
    </div>
  )
}

// ──────────────────────────────────────────────────────────
function Pill({
  label,
  selected,
  size = 'md',
  onClick,
}: {
  label: string
  selected: boolean
  size?: 'sm' | 'md'
  onClick: () => void
}) {
  const padX = size === 'sm' ? 'px-3' : 'px-3.5'
  const padY = size === 'sm' ? 'py-1' : 'py-1.5'
  const fontSize = size === 'sm' ? 'text-xs' : 'text-sm'
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`${padX} ${padY} ${fontSize} rounded-full font-semibold transition-colors whitespace-nowrap ${
        selected
          ? 'bg-[color:var(--color-glow-300)] text-foreground'
          : 'bg-white text-foreground hover:bg-[color:var(--color-glow-50)]'
      }`}
    >
      {label}
    </motion.button>
  )
}

// ──────────────────────────────────────────────────────────
// Variant A — open word cloud (always expanded)
function VariantA() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DarkCard>
      <h3 className="text-xl font-semibold leading-tight">
        How did you first hear about Chaiz?
      </h3>
      <p className="text-xs opacity-70 mt-1 mb-4">Tap one to begin</p>
      <div className="flex flex-wrap gap-2">
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
// Variant B — peek + expand (clip ~2 rows, gradient fade, "Show all" chip)
function VariantB() {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DarkCard>
      <h3 className="text-xl font-semibold leading-tight">
        How did you first hear about Chaiz?
      </h3>
      <p className="text-xs opacity-70 mt-1 mb-4">Tap one to begin</p>
      <motion.div
        animate={{ height: expanded ? 'auto' : 92 }}
        transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative overflow-hidden"
      >
        <div className="flex flex-wrap gap-2">
          {Q1_OPTIONS.map((opt) => (
            <Pill
              key={opt}
              label={opt}
              selected={selected === opt}
              onClick={() => setSelected(opt)}
            />
          ))}
        </div>
        {!expanded && (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-12"
            style={{
              background:
                'linear-gradient(to top, var(--card-background) 30%, transparent)',
            }}
          />
        )}
      </motion.div>
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.12)',
            color: '#fff',
          }}
        >
          Show all 11 options ↓
        </button>
      )}
    </DarkCard>
  )
}

// ──────────────────────────────────────────────────────────
// Variant C — card-level unfold (heading only → full cloud)
function VariantC() {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DarkCard>
      <button
        type="button"
        onClick={() => !expanded && setExpanded(true)}
        className="w-full text-left"
        disabled={expanded}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight">
            How did you first hear about Chaiz?
          </h3>
          {!expanded && (
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
              style={{
                background: 'var(--color-glow-300)',
                color: 'var(--color-foreground)',
              }}
            >
              Tap to start ↓
            </motion.span>
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="cloud"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.34, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {Q1_OPTIONS.map((opt, i) => (
                <motion.div
                  key={opt}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.025 }}
                >
                  <Pill
                    label={opt}
                    selected={selected === opt}
                    onClick={() => setSelected(opt)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DarkCard>
  )
}

// ──────────────────────────────────────────────────────────
// Variant D — show first N pills + "+more" chip that expands inline
function VariantD() {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const N = 5
  const visible = expanded ? Q1_OPTIONS : Q1_OPTIONS.slice(0, N)
  const hidden = Math.max(0, Q1_OPTIONS.length - N)
  return (
    <DarkCard>
      <h3 className="text-xl font-semibold leading-tight">
        How did you first hear about Chaiz?
      </h3>
      <p className="text-xs opacity-70 mt-1 mb-4">Tap one to begin</p>
      <div className="flex flex-wrap gap-2">
        {visible.map((opt) => (
          <Pill
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => setSelected(opt)}
          />
        ))}
        {!expanded && hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="px-3.5 py-1.5 text-sm rounded-full font-semibold"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
            }}
          >
            +{hidden} more
          </button>
        )}
      </div>
    </DarkCard>
  )
}

// ──────────────────────────────────────────────────────────
// Variant E — staggered cascade reveal on first hover/tap of card
function VariantE() {
  const [revealed, setRevealed] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <DarkCard>
      <div
        onMouseEnter={() => !revealed && setRevealed(true)}
        onClick={() => !revealed && setRevealed(true)}
      >
        <h3 className="text-xl font-semibold leading-tight">
          How did you first hear about Chaiz?
        </h3>
        <p className="text-xs opacity-70 mt-1 mb-4">
          {revealed ? 'Tap one to begin' : 'Hover or tap to see options'}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[44px]">
        {Q1_OPTIONS.map((opt, i) => (
          <motion.div
            key={opt}
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={
              revealed
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.85, y: 6 }
            }
            transition={{ delay: i * 0.04, duration: 0.28 }}
          >
            <Pill
              label={opt}
              selected={selected === opt}
              onClick={() => setSelected(opt)}
            />
          </motion.div>
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
          Q1 word-cloud explorations
        </h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-prose">
          Variable-width pills wrapping in a cloud (saves vertical space),
          paired with different "collapsed → unfold" patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Wrap
          title="A — Open cloud"
          caption="All 11 pills wrap naturally. Densest, no interaction needed to see options."
        >
          <VariantA />
        </Wrap>

        <Wrap
          title="B — Peek + Show all"
          caption="Clipped at ~2 rows with a gradient fade, chip below to expand. Compact at rest."
        >
          <VariantB />
        </Wrap>

        <Wrap
          title="C — Card unfolds"
          caption='Card starts as a heading + "Tap to start" cue. On tap, the cloud cascades in.'
        >
          <VariantC />
        </Wrap>

        <Wrap
          title='D — First 5 + "+6 more"'
          caption="Show top options inline, hide the rest behind a +N chip. Promotes the most likely answers."
        >
          <VariantD />
        </Wrap>

        <Wrap
          title="E — Cascade on hover/tap"
          caption="Pills are invisible at rest; cascade in on hover or tap. Card stays the same height."
        >
          <VariantE />
        </Wrap>
      </div>
    </div>
  )
}
