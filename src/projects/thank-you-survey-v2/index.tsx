import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'

// ──────────────────────────────────────────────────────────
// Data
type Step = 'teaser' | 1 | 2 | 3 | 4 | 5 | 'done'

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

const Q2_OPTIONS = [
  'Another warranty company (Endurance, CarShield, CARCHEX, etc.)',
  'Extended warranty from my dealer',
  'Saving up for repairs on my own',
  "I wasn't sure I needed a warranty at all",
  'Nothing — Chaiz was my first choice',
]

const Q3_OPTIONS = [
  'Price',
  'Being able to compare plans from different providers',
  "Knowing exactly what's covered and what's not",
  'Reviews and ratings of providers',
  'Being able to buy online without speaking to a salesperson',
  'Ease of the purchase process',
  'The company I chose is well-known and trusted',
  'The plan I wanted was only available on Chaiz',
]

const Q4_OPTIONS = [
  'Coverage scores and ratings for each plan',
  'Expert recommendations',
  'Quiz and personalised results',
  'Filters on the results page',
  'Being able to download the full contract before buying',
  'Contract details (coverage, limits, benefits)',
  'Add-ons and benefits clearly listed',
]

function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// ──────────────────────────────────────────────────────────
// Icons
function Icon({
  d,
  size = 20,
  className = '',
  fill = 'none',
}: {
  d: string
  size?: number
  className?: string
  fill?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      dangerouslySetInnerHTML={{ __html: d }}
    />
  )
}
const Icons = {
  check: '<polyline points="20 6 9 17 4 12" />',
  checkCircle:
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />',
  chevronDown: '<path d="m6 9 6 6 6-6" />',
  chevronRight: '<path d="m9 18 6-6-6-6" />',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />',
  x: '<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />',
  shield:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />',
  calendar:
    '<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />',
  calX:
    '<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="9" y1="14" x2="15" y2="20" /><line x1="15" y1="14" x2="9" y2="20" />',
  cal30:
    '<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><text x="12" y="18" text-anchor="middle" font-size="6" font-weight="700" fill="currentColor" stroke="none">30</text>',
}

function ChaizLogo({ height = 20 }: { height?: number }) {
  const width = (height / 20) * 67
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 67 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Chaiz"
    >
      <path
        d="M7.01556 20C5.67233 20 4.46665 19.7168 3.39854 19.1504C2.33043 18.5839 1.49698 17.799 0.898186 16.7957C0.299395 15.7761 0 14.6271 0 13.3486C0 12.0701 0.299395 10.9291 0.898186 9.92576C1.49698 8.92238 2.32234 8.13748 3.37427 7.57106C4.44238 7.00463 5.65614 6.72142 7.01556 6.72142C8.29406 6.72142 9.41072 6.98036 10.3656 7.49823C11.3366 8.0161 12.0648 8.76054 12.5503 9.73156L10.2199 11.091C9.84768 10.4922 9.37836 10.0471 8.81193 9.75583C8.26169 9.44834 7.65481 9.2946 6.99129 9.2946C5.85844 9.2946 4.91979 9.66682 4.17535 10.4113C3.43091 11.1395 3.05869 12.1186 3.05869 13.3486C3.05869 14.5785 3.42282 15.5657 4.15108 16.3102C4.89552 17.0384 5.84226 17.4026 6.99129 17.4026C7.65481 17.4026 8.26169 17.2569 8.81193 16.9656C9.37836 16.6581 9.84768 16.205 10.2199 15.6062L12.5503 16.9656C12.0486 17.9366 11.3123 18.6891 10.3413 19.2232C9.38645 19.7411 8.27788 20 7.01556 20Z"
        fill="currentColor"
      />
      <path
        d="M23.0657 6.72142C24.7002 6.72142 26.0111 7.19883 26.9983 8.15366C27.9855 9.10849 28.4791 10.5246 28.4791 12.4018V19.8301H25.4447V12.7902C25.4447 11.6574 25.1777 10.8078 24.6436 10.2413C24.1095 9.65873 23.3489 9.36743 22.3617 9.36743C21.2451 9.36743 20.3631 9.70728 19.7157 10.387C19.0684 11.0505 18.7447 12.0134 18.7447 13.2758V19.8301H15.7103V1.81781H18.7447V8.37214C19.2464 7.83808 19.8614 7.4335 20.5896 7.15838C21.3341 6.86707 22.1594 6.72142 23.0657 6.72142Z"
        fill="currentColor"
      />
      <path
        d="M37.936 6.72142C39.8457 6.72142 41.3022 7.18265 42.3056 8.10511C43.3251 9.01139 43.8349 10.387 43.8349 12.2319V19.8301H40.9704V18.2522C40.5982 18.8186 40.0642 19.2556 39.3683 19.5631C38.6886 19.8544 37.8632 20 36.8922 20C35.9212 20 35.0715 19.8382 34.3433 19.5145C33.615 19.1746 33.0486 18.7134 32.644 18.1308C32.2556 17.532 32.0614 16.8604 32.0614 16.116C32.0614 14.9507 32.4903 14.0202 33.348 13.3243C34.2219 12.6122 35.5894 12.2562 37.4505 12.2562H40.8005V12.062C40.8005 11.1557 40.5254 10.4598 39.9752 9.97431C39.4411 9.4888 38.64 9.24605 37.5719 9.24605C36.8436 9.24605 36.1235 9.35934 35.4114 9.58591C34.7155 9.81247 34.1248 10.1281 33.6393 10.5326L32.4498 8.32359C33.1295 7.80572 33.9468 7.40922 34.9016 7.1341C35.8564 6.85898 36.8679 6.72142 37.936 6.72142ZM37.5233 17.791C38.284 17.791 38.9556 17.621 39.5382 17.2812C40.137 16.9251 40.5578 16.4234 40.8005 15.7761V14.271H37.669C35.9212 14.271 35.0473 14.8456 35.0473 15.9946C35.0473 16.5448 35.2657 16.9818 35.7027 17.3054C36.1397 17.6291 36.7465 17.791 37.5233 17.791Z"
        fill="currentColor"
      />
      <path
        d="M48.3846 6.86707H51.4191V19.8301H48.3846V6.86707Z"
        fill="currentColor"
      />
      <path
        d="M66.18 17.4026V19.8301H54.989V17.9123L62.1017 9.2946H55.1347V6.86707H65.9858V8.78482L58.8488 17.4026H66.18Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.7827 4.63901L41.2968 2.84019L41.5225 0.645918L59.0085 2.44473L58.7827 4.63901Z"
        fill="var(--color-glow-400)"
      />
    </svg>
  )
}

function StarSVG({ filled }: { filled: boolean }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

// ──────────────────────────────────────────────────────────
// Motion variants
const slide = {
  initial: (dir: number) => ({ x: dir * 24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: -dir * 24, opacity: 0 }),
}
const slideT = { duration: 0.26, ease: [0.2, 0.8, 0.2, 1] as const }

// ──────────────────────────────────────────────────────────
// Survey card wrapper (reusable): bordered rounded-xl box with optional close
function SurveyCard({
  children,
  onClose,
  showClose = true,
}: {
  children: React.ReactNode
  onClose?: () => void
  showClose?: boolean
}) {
  return (
    <div className="rounded-xl bg-card border border-border px-5 py-4 relative">
      {showClose && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon d={Icons.x} size={18} />
        </button>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Option row
function OptionRow({
  label,
  selected,
  disabled = false,
  multi = false,
  shakeKey,
  onClick,
}: {
  label: string
  selected: boolean
  disabled?: boolean
  multi?: boolean
  shakeKey?: number
  onClick: () => void
}) {
  return (
    <motion.button
      key={shakeKey}
      type="button"
      onClick={onClick}
      animate={
        shakeKey !== undefined && disabled
          ? { x: [0, -4, 4, -3, 3, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.35 }}
      whileHover={disabled ? {} : { y: -1 }}
      className={`w-full flex items-center gap-2 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
        selected
          ? 'bg-card border-primary'
          : 'bg-card border-border hover:border-primary/40'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`shrink-0 w-4 h-4 border flex items-center justify-center ${
          multi ? 'rounded-[3px]' : 'rounded-full'
        } ${selected ? 'bg-primary border-primary' : 'border-foreground bg-card'}`}
      >
        {selected &&
          (multi ? (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
          ))}
      </span>
      <span className="font-semibold text-foreground">{label}</span>
    </motion.button>
  )
}

// ──────────────────────────────────────────────────────────
// Counter footer (shared) + optional Next
function CardFooter({
  counter,
  onNext,
  nextLabel = 'Next',
}: {
  counter: string
  onNext?: () => void
  nextLabel?: string
}) {
  return (
    <div className="pt-1 space-y-2">
      <div className="text-xs text-muted-foreground text-center">{counter}</div>
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-95 transition-opacity"
        >
          {nextLabel}
        </button>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Teaser (Start state)
function Teaser({
  onStart,
  mobile,
}: {
  onStart: () => void
  mobile: boolean
}) {
  return (
    <motion.div
      key="teaser"
      variants={slide}
      custom={1}
      initial="initial"
      animate="center"
      exit="exit"
      transition={slideT}
    >
      <div
        className={`rounded-xl px-5 py-4 ${
          mobile ? 'space-y-3' : 'flex items-center gap-5'
        }`}
        style={{ background: 'var(--card-background)', color: '#fff' }}
      >
        <div className={mobile ? 'space-y-1.5' : 'flex-1 space-y-1'}>
          <div className="text-base font-semibold">
            Before you go… How did you first hear about Chaiz?
          </div>
          <div className="text-sm opacity-80">
            Answer 5 questions in less than 60 seconds
          </div>
        </div>
        <button
          type="button"
          onClick={onStart}
          className={`h-11 rounded-lg bg-white font-semibold text-foreground transition-colors hover:opacity-95 flex items-center justify-center gap-2 ${
            mobile ? 'w-full mt-1' : 'shrink-0 px-6'
          }`}
        >
          Start <Icon d={Icons.arrowRight} size={16} />
        </button>
      </div>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────
// Q1 — source attribution (auto-advance on select)
function Q1Card({
  selected,
  otherText,
  onSelect,
  onOtherChange,
  onClose,
  onAutoAdvance,
}: {
  selected: string | null
  otherText: string
  onSelect: (v: string) => void
  onOtherChange: (v: string) => void
  onClose: () => void
  onAutoAdvance: () => void
}) {
  return (
    <motion.div
      key="q1"
      variants={slide}
      custom={1}
      initial="initial"
      animate="center"
      exit="exit"
      transition={slideT}
    >
      <SurveyCard onClose={onClose}>
        <div className="text-base font-semibold text-foreground pr-6">
          How did you first hear about Chaiz?
        </div>
        <div className="space-y-2">
          {Q1_OPTIONS.map((opt) => {
            const isSelected = selected === opt
            const label = opt === 'Other' ? 'Other' : opt
            return (
              <div key={opt}>
                <OptionRow
                  label={label}
                  selected={isSelected}
                  onClick={() => {
                    onSelect(opt)
                    if (opt !== 'Other') {
                      // Auto-advance after a small delay
                      setTimeout(onAutoAdvance, 280)
                    }
                  }}
                />
                <AnimatePresence>
                  {opt === 'Other' && isSelected && (
                    <motion.div
                      key="other-input"
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.26, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <textarea
                        autoFocus
                        value={otherText}
                        onChange={(e) =>
                          onOtherChange(e.target.value.slice(0, 120))
                        }
                        placeholder="Tell us where…"
                        rows={2}
                        className="w-full rounded-lg border-2 border-primary bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
                      />
                      <div className="flex justify-between items-center mt-1.5">
                        <div className="text-xs text-muted-foreground">
                          {otherText.length}/120
                        </div>
                        <button
                          type="button"
                          onClick={onAutoAdvance}
                          className="text-xs font-semibold text-foreground underline underline-offset-2"
                        >
                          Continue →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
        <CardFooter counter="3 questions left" />
      </SurveyCard>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────
// Q2 — competitive landscape (auto-advance)
function Q2Card({
  selected,
  onSelect,
  onClose,
  onAutoAdvance,
}: {
  selected: string | null
  onSelect: (v: string) => void
  onClose: () => void
  onAutoAdvance: () => void
}) {
  return (
    <motion.div
      key="q2"
      variants={slide}
      custom={1}
      initial="initial"
      animate="center"
      exit="exit"
      transition={slideT}
    >
      <SurveyCard onClose={onClose}>
        <div className="text-base font-semibold text-foreground pr-6">
          What were you thinking about doing before you chose Chaiz?
        </div>
        <div className="space-y-2">
          {Q2_OPTIONS.map((opt) => (
            <OptionRow
              key={opt}
              label={opt}
              selected={selected === opt}
              onClick={() => {
                onSelect(opt)
                setTimeout(onAutoAdvance, 280)
              }}
            />
          ))}
        </div>
        <CardFooter counter="2 questions left" />
      </SurveyCard>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────
// Multi-select card (Q3 + Q4)
function MultiSelectCard({
  cardKey,
  title,
  helper,
  options,
  selected,
  counter,
  onToggle,
  onClose,
  onNext,
  preHeader,
  onCardTap,
}: {
  cardKey: string
  title: string
  helper: string
  options: readonly string[]
  selected: string[]
  counter: string
  onToggle: (v: string) => void
  onClose: () => void
  onNext: () => void
  preHeader?: React.ReactNode
  onCardTap?: () => void
}) {
  const [shakeMap, setShakeMap] = useState<Record<string, number>>({})
  const max = 3
  const atMax = selected.length >= max

  return (
    <motion.div
      key={cardKey}
      variants={slide}
      custom={1}
      initial="initial"
      animate="center"
      exit="exit"
      transition={slideT}
      onClickCapture={onCardTap}
    >
      {preHeader}
      <SurveyCard onClose={onClose}>
        <div className="pr-6">
          <div className="text-base font-semibold text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{helper}</div>
        </div>
        <div className="space-y-2">
          {options.map((opt) => {
            const isSelected = selected.includes(opt)
            const disabled = atMax && !isSelected
            return (
              <OptionRow
                key={opt}
                label={opt}
                multi
                selected={isSelected}
                disabled={disabled}
                shakeKey={shakeMap[opt]}
                onClick={() => {
                  if (disabled) {
                    setShakeMap((s) => ({ ...s, [opt]: (s[opt] || 0) + 1 }))
                    return
                  }
                  onToggle(opt)
                }}
              />
            )
          })}
        </div>
        <CardFooter counter={counter} onNext={onNext} />
      </SurveyCard>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────
// Q5 — NPS
function Q5Card({
  rating,
  text,
  onRate,
  onText,
  onClose,
  onNext,
}: {
  rating: number
  text: string
  onRate: (n: number) => void
  onText: (v: string) => void
  onClose: () => void
  onNext: () => void
}) {
  const positive = rating >= 4
  const prompt = !rating
    ? ''
    : positive
      ? 'Glad to hear it! Anything we should keep doing?'
      : 'We want to do better. What could we improve?'
  return (
    <motion.div
      key="q5"
      variants={slide}
      custom={1}
      initial="initial"
      animate="center"
      exit="exit"
      transition={slideT}
    >
      <SurveyCard onClose={onClose}>
        <div className="text-base font-semibold text-foreground pr-6">
          How was your buying experience?
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => {
            const filled = n <= rating
            return (
              <motion.button
                key={n}
                type="button"
                onClick={() => onRate(n)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                animate={{ scale: filled ? 1 : 0.98 }}
                transition={{ duration: 0.18 }}
                className="p-0.5"
                style={{ color: filled ? '#f9a826' : '#c7c7c7' }}
              >
                <StarSVG filled={filled} />
              </motion.button>
            )
          })}
        </div>
        <AnimatePresence>
          {rating > 0 && (
            <motion.div
              key={positive ? 'pos' : 'neg'}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="overflow-hidden space-y-2"
            >
              <div className="text-sm font-semibold text-foreground">
                {prompt}
              </div>
              <textarea
                value={text}
                onChange={(e) => onText(e.target.value.slice(0, 240))}
                placeholder="Optional — 1 or 2 lines"
                rows={2}
                className="w-full rounded-lg border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <CardFooter counter="Last question" onNext={onNext} nextLabel="Submit" />
      </SurveyCard>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────
// Done
function DoneCard() {
  return (
    <motion.div
      key="done"
      variants={slide}
      custom={1}
      initial="initial"
      animate="center"
      exit="exit"
      transition={slideT}
    >
      <SurveyCard showClose={false}>
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ y: 4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base font-semibold text-foreground"
          >
            Thanks for sharing.
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              delay: 0.05,
            }}
            style={{ color: 'var(--color-glow-700)' }}
          >
            <Icon d={Icons.checkCircle} size={22} />
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground"
        >
          View your contract details, track your coverage, and see what's next.
        </motion.div>
      </SurveyCard>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────
// Right-side product / price card
function PriceCard() {
  return (
    <div className="rounded-xl bg-card border border-border p-5 space-y-4">
      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-semibold text-foreground">$96</span>
        <span className="text-base text-muted-foreground">/mo</span>
      </div>
      <div className="border-t border-border" />
      {/* Plan */}
      <div className="flex items-center gap-3">
        <div
          className="shrink-0 w-12 h-12 rounded-md flex items-center justify-center text-[9px] font-bold"
          style={{ background: '#dbeafe', color: '#1e3a8a' }}
        >
          NAAC
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold text-foreground leading-tight">
            Advanced Enhanced
          </div>
          <div className="text-sm text-muted-foreground">
            North American Auto Care
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground font-semibold">
          <span>$85</span>
          <Icon d={Icons.chevronDown} size={16} className="text-muted-foreground" />
        </div>
      </div>
      <div className="border-t border-border" />
      {/* Add-ons */}
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold text-foreground">
          Add-ons (1)
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground font-semibold">
          <span>$7</span>
          <Icon d={Icons.chevronDown} size={16} className="text-muted-foreground" />
        </div>
      </div>
      <div className="border-t border-border" />
      {/* Badges */}
      <div className="flex items-center gap-5 text-sm">
        <span className="inline-flex items-center gap-1.5 text-foreground">
          <span style={{ color: 'var(--color-glow-700)' }}>
            <Icon d={Icons.calX} size={16} />
          </span>
          Cancel anytime
        </span>
        <span className="inline-flex items-center gap-1.5 text-foreground">
          <span style={{ color: 'var(--color-glow-700)' }}>
            <Icon d={Icons.cal30} size={16} />
          </span>
          30-day money-back
        </span>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Main thank-you page + survey slot
function ThankYouPage({
  children,
  mobile,
  viewContractPrimary,
  pageCtaLabel,
}: {
  children: React.ReactNode
  mobile: boolean
  viewContractPrimary: boolean
  pageCtaLabel: string
}) {
  return (
    <div className="min-h-[900px] bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div
          className={`mx-auto flex items-center justify-between ${mobile ? 'px-4 h-12' : 'px-8 h-16 max-w-[1200px]'}`}
        >
          <div className="text-foreground">
            <ChaizLogo height={mobile ? 18 : 22} />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon d={Icons.message} size={16} />
            <span className={mobile ? 'hidden' : ''}>Talk to an expert</span>
          </div>
        </div>
      </header>
      {/* Content */}
      <div
        className={`mx-auto ${mobile ? 'px-4 py-6 space-y-6' : 'max-w-[1100px] px-8 py-10 grid grid-cols-[minmax(0,1fr)_360px] gap-8'}`}
      >
        {/* Left column */}
        <div className="space-y-6">
          {/* Hero */}
          <div className="flex items-start gap-3">
            <div
              className="shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--color-glow-100)',
                color: 'var(--color-glow-700)',
              }}
            >
              <Icon d={Icons.check} size={14} />
            </div>
            <div>
              <div
                className={`font-semibold text-foreground ${mobile ? 'text-lg' : 'text-2xl'}`}
              >
                It's official! You're ready to hit the road.
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                You have purchased a plan. We've emailed your confirmation to
                john.hawkins@gmail.com.
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-border" />
          {/* What's next */}
          <div className="space-y-4">
            <div
              className={`font-semibold text-foreground ${mobile ? 'text-base' : 'text-xl'}`}
            >
              What's next:
            </div>
            <TimelineRow
              left="24h"
              title="Receive digital contract"
              body="If you don't receive an email within 24 hours, please check your spam folder."
            />
            <TimelineRow
              left="7-14 days"
              title="Receive physical documentation"
              body="This may take up to two weeks to mail to your home address."
            />
            <TimelineRow
              left="30 days"
              title="Coverage starts after driving 1,000 miles and waiting 30 days"
              body="This is standard industry waiting period before you can file your first claim."
            />
          </div>
          {/* Survey slot */}
          <div className="pt-2">{children}</div>
          {/* Page CTA (View Contract / Log In to Your Client Area) */}
          <button
            type="button"
            className={`w-full h-12 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
              viewContractPrimary
                ? 'bg-primary text-primary-foreground hover:opacity-95'
                : 'border border-border bg-card text-foreground hover:bg-accent'
            }`}
          >
            {pageCtaLabel} <Icon d={Icons.arrowRight} size={16} />
          </button>
          <div className="text-xs text-muted-foreground">
            We've created an account for you to view your contract, claims
            hotline, and roadside assistance.
          </div>
        </div>
        {/* Right column */}
        {!mobile && (
          <aside className="space-y-4">
            <PriceCard />
          </aside>
        )}
        {mobile && <PriceCard />}
      </div>
      {/* Footer */}
      <footer className="border-t border-border mt-10">
        <div
          className={`mx-auto flex items-center justify-between text-xs text-muted-foreground ${mobile ? 'px-4 py-4 flex-col gap-2' : 'max-w-[1100px] px-8 h-12'}`}
        >
          <span>© 2021–2025 Chaiz Inc.</span>
          <div className="flex items-center gap-5">
            <a className="underline underline-offset-4">All Rights Reserved</a>
            <a className="underline underline-offset-4">Privacy Policy</a>
            <a className="underline underline-offset-4">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TimelineRow({
  left,
  title,
  body,
}: {
  left: string
  title: string
  body: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-16 shrink-0 text-xs text-muted-foreground font-medium pt-0.5">
        {left}
      </div>
      <div className="border-l-2 border-border pl-4 flex-1">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{body}</div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// View toggle
function ViewToggle({
  view,
  onChange,
}: {
  view: 'desktop' | 'mobile'
  onChange: (v: 'desktop' | 'mobile') => void
}) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-card p-0.5">
      {(['desktop', 'mobile'] as const).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`px-3 h-8 text-sm font-medium rounded-md transition-colors ${
            view === v
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {v === 'desktop' ? 'Desktop' : 'Mobile'}
        </button>
      ))}
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Main component
export default function ThankYouSurveyV2() {
  const [params, setParams] = useSearchParams()
  const view: 'desktop' | 'mobile' =
    params.get('view') === 'mobile' ? 'mobile' : 'desktop'
  const setView = (v: 'desktop' | 'mobile') =>
    setParams({ view: v }, { replace: true })

  const [mountNonce, setMountNonce] = useState(0)
  const [step, setStep] = useState<Step>('teaser')

  const [q1, setQ1] = useState<string | null>(null)
  const [q1Other, setQ1Other] = useState('')
  const [q2, setQ2] = useState<string | null>(null)
  const [q3, setQ3] = useState<string[]>([])
  const [q4, setQ4] = useState<string[]>([])
  const [q5, setQ5] = useState(0)
  const [q5Text, setQ5Text] = useState('')

  const q3Order = useMemo(
    () => shuffle(Q3_OPTIONS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mountNonce],
  )
  const q4Order = useMemo(
    () => shuffle(Q4_OPTIONS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mountNonce],
  )

  function advance() {
    setStep((s) => {
      if (s === 'teaser') return 1
      if (s === 1) return 2
      if (s === 2) return 3
      if (s === 3) return 4
      if (s === 4) return 5
      return 'done'
    })
  }
  function closeSurvey() {
    setStep('done')
  }
  function toggleQ3(v: string) {
    setQ3((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))
  }
  function toggleQ4(v: string) {
    setQ4((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))
  }
  function restart() {
    setMountNonce((n) => n + 1)
    setStep('teaser')
    setQ1(null)
    setQ1Other('')
    setQ2(null)
    setQ3([])
    setQ4([])
    setQ5(0)
    setQ5Text('')
  }

  const mobile = view === 'mobile'
  const viewContractPrimary = step === 'teaser' || step === 'done'
  const pageCtaLabel =
    step === 'done' ? 'Log In to Your Client Area' : 'View Contract'

  const surveyCard = (
    <AnimatePresence mode="wait">
      {step === 'teaser' && <Teaser onStart={advance} mobile={mobile} />}
      {step === 1 && (
        <Q1Card
          selected={q1}
          otherText={q1Other}
          onSelect={setQ1}
          onOtherChange={setQ1Other}
          onClose={closeSurvey}
          onAutoAdvance={advance}
        />
      )}
      {step === 2 && (
        <Q2Card
          selected={q2}
          onSelect={setQ2}
          onClose={closeSurvey}
          onAutoAdvance={advance}
        />
      )}
      {step === 3 && (
        <MultiSelectCard
          cardKey="q3"
          title="What mattered most in your decision to buy through Chaiz?"
          helper="Choose up to 3"
          options={q3Order}
          selected={q3}
          counter="2 questions left"
          onToggle={toggleQ3}
          onClose={closeSurvey}
          onNext={advance}
        />
      )}
      {step === 4 && (
        <MultiSelectCard
          cardKey="q4"
          title="What was most helpful in making your decision?"
          helper="Choose up to 3"
          options={q4Order}
          selected={q4}
          counter="1 question left"
          onToggle={toggleQ4}
          onClose={closeSurvey}
          onNext={advance}
        />
      )}
      {step === 5 && (
        <Q5Card
          rating={q5}
          text={q5Text}
          onRate={setQ5}
          onText={setQ5Text}
          onClose={closeSurvey}
          onNext={advance}
        />
      )}
      {step === 'done' && <DoneCard />}
    </AnimatePresence>
  )

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Thank-you survey v2
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Full thank-you page with survey card in the main column. Toggle
            Desktop / Mobile in the top-right.
          </p>
        </div>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {/* Stage */}
      <div className="rounded-2xl bg-muted/40 p-6 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.22 }}
            className="w-full"
            style={mobile ? { maxWidth: 420 } : { maxWidth: 1180 }}
          >
            {mobile ? (
              <div
                className="mx-auto rounded-[40px] overflow-hidden"
                style={{
                  width: 391,
                  padding: 8,
                  background: '#111',
                  boxShadow: '0 20px 60px -20px rgba(0,0,0,0.4)',
                }}
              >
                <div
                  className="rounded-[32px] overflow-hidden bg-background"
                  style={{ width: 375 }}
                >
                  <ThankYouPage
                    mobile
                    viewContractPrimary={viewContractPrimary}
                    pageCtaLabel={pageCtaLabel}
                  >
                    {surveyCard}
                  </ThankYouPage>
                </div>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                <ThankYouPage
                  mobile={false}
                  viewContractPrimary={viewContractPrimary}
                  pageCtaLabel={pageCtaLabel}
                >
                  {surveyCard}
                </ThankYouPage>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Restart pill */}
      <button
        type="button"
        onClick={restart}
        className="fixed bottom-6 right-6 h-9 px-4 rounded-full bg-foreground text-background text-sm font-medium shadow-lg hover:opacity-90 transition-opacity z-20"
      >
        ↺ Restart
      </button>
    </div>
  )
}
