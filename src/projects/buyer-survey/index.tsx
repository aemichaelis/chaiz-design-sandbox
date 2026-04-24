import { useState } from 'react'

// ───────────────────────────────────────────────────────────────
// Question options (original order — gets shuffled per session)
// ───────────────────────────────────────────────────────────────

const Q1_OPTIONS: Option[] = [
  { value: 'google', label: 'Google search' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'ai', label: 'ChatGPT / AI recommendation' },
  { value: 'article', label: 'Online article or review' },
  { value: 'friend', label: 'Friend or family recommendation' },
  { value: 'agent', label: 'Insurance agent or dealer told me about it' },
  { value: 'social', label: 'Social media (Facebook, Instagram)' },
  { value: 'ad', label: 'Saw an ad' },
  { value: 'tv', label: 'On TV' },
]
const Q1_OTHER: Option = { value: 'other', label: 'Other' }

const Q2_OPTIONS: Option[] = [
  {
    value: 'competitor',
    label: 'Another warranty company (Endurance, CarShield, CARCHEX, etc.)',
  },
  { value: 'dealer', label: 'Extended warranty from my dealer' },
  { value: 'savings', label: 'Saving up for repairs on my own' },
  {
    value: 'unsure',
    label: "I wasn't sure I needed a warranty at all",
  },
  { value: 'first-choice', label: 'Nothing — Chaiz was my first choice' },
]

const Q3_OPTIONS: Option[] = [
  { value: 'price', label: 'Price' },
  {
    value: 'compare',
    label: 'Being able to compare plans from different providers',
  },
  {
    value: 'coverage',
    label: "Knowing exactly what's covered and what's not",
  },
  { value: 'reviews', label: 'Reviews and ratings of providers' },
  {
    value: 'self-service',
    label: 'Being able to buy online without speaking to a salesperson',
  },
  { value: 'ease', label: 'Ease of the purchase process' },
  { value: 'trust', label: 'The company I chose is well-known and trusted' },
  {
    value: 'exclusive',
    label: 'The plan I wanted was only available on Chaiz',
  },
]

const Q4_OPTIONS: Option[] = [
  { value: 'scores', label: 'Coverage scores and ratings for each plan' },
  { value: 'expert', label: 'Expert recommendations' },
  { value: 'quiz', label: 'Quiz and personalised results' },
  { value: 'filters', label: 'Filters on the results page' },
  {
    value: 'download',
    label: 'Being able to download the full contract before buying',
  },
  {
    value: 'details',
    label: 'Contract details (coverage, limits, benefits)',
  },
  { value: 'addons', label: 'Add-ons and benefits clearly listed' },
]

// ───────────────────────────────────────────────────────────────
// Types & helpers
// ───────────────────────────────────────────────────────────────

type Option = { value: string; label: string }

type Answers = {
  source?: string
  sourceOther?: string
  preChoice?: string
  drivers?: string[]
  features?: string[]
  rating?: number
  feedback?: string
}

type Step = 'closed' | 1 | 2 | 3 | 4 | 5 | 'done'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function logEvent(event: string, props: Record<string, unknown>) {
  // Mock for the prototype — in prod this would fire to Mixpanel

  console.log(`[mixpanel] ${event}`, props)
}

// ───────────────────────────────────────────────────────────────
// Main component
// ───────────────────────────────────────────────────────────────

export default function BuyerSurvey() {
  const [utmKnown, setUtmKnown] = useState(false)

  return (
    <div className="-mx-6 -my-10">
      {/* Debug control — prototype only */}
      <div className="border-b border-dashed border-glow-400 bg-glow-50 px-6 py-2">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">
            prototype debug: entry path
          </span>
          <div className="flex gap-1 font-mono">
            <button
              onClick={() => setUtmKnown(false)}
              className={`px-2 py-0.5 rounded ${
                !utmKnown
                  ? 'bg-foreground text-background'
                  : 'bg-transparent hover:bg-muted'
              }`}
            >
              organic (5 q)
            </button>
            <button
              onClick={() => setUtmKnown(true)}
              className={`px-2 py-0.5 rounded ${
                utmKnown
                  ? 'bg-foreground text-background'
                  : 'bg-transparent hover:bg-muted'
              }`}
            >
              known UTM (4 q)
            </button>
          </div>
        </div>
      </div>

      {/* Fake TY page header */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold tracking-tight">chaiz</span>
            <span className="text-xs text-muted-foreground">
              Extended vehicle coverage
            </span>
          </div>
          <a className="text-sm text-muted-foreground hover:text-foreground">
            Help
          </a>
        </div>
      </div>

      {/* TY page content */}
      <div className="max-w-2xl mx-auto px-6 py-14 space-y-8">
        <CoverageConfirmation />
        <OrderSummary />
        <SurveyCard utmKnown={utmKnown} key={utmKnown ? 'utm' : 'organic'} />
        <NextSteps />
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────
// Fake TY page pieces
// ───────────────────────────────────────────────────────────────

function CoverageConfirmation() {
  return (
    <div className="text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-glow-400 mb-4">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 12 10 18 20 6" />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight mb-2">
        You're covered!
      </h1>
      <p className="text-muted-foreground">
        Contract{' '}
        <span className="font-mono text-foreground">#CHZ-00482104</span> is
        active.
      </p>
    </div>
  )
}

function OrderSummary() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
        Your plan
      </h2>
      <dl className="grid grid-cols-2 gap-y-2 text-sm">
        <dt className="text-muted-foreground">Plan</dt>
        <dd className="font-medium text-right">
          Protect My Car · Diamond 5yr / 75k mi
        </dd>
        <dt className="text-muted-foreground">Monthly</dt>
        <dd className="font-medium text-right">$89.04 × 24 months</dd>
        <dt className="text-muted-foreground">Coverage starts</dt>
        <dd className="font-medium text-right">May 1, 2026</dd>
      </dl>
    </div>
  )
}

function NextSteps() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <button className="flex-1 h-11 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
        Log in to your client area →
      </button>
      <button className="flex-1 h-11 rounded-md border border-border bg-background font-medium hover:bg-muted transition-colors">
        Download contract PDF
      </button>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────
// Survey card (collapsed → expanded)
// ───────────────────────────────────────────────────────────────

function SurveyCard({ utmKnown }: { utmKnown: boolean }) {
  const firstStep: Step = utmKnown ? 2 : 1
  const [step, setStep] = useState<Step>('closed')
  const [answers, setAnswers] = useState<Answers>(
    utmKnown ? { source: 'utm:branded-sem' } : {},
  )
  const [microcopyVisible, setMicrocopyVisible] = useState(true)

  // Shuffle options once per mount (per UTM flip we remount thanks to key)
  const [options] = useState(() => ({
    q1: [...shuffle(Q1_OPTIONS), Q1_OTHER],
    q2: shuffle(Q2_OPTIONS),
    q3: shuffle(Q3_OPTIONS),
    q4: shuffle(Q4_OPTIONS),
  }))

  function open() {
    setStep(firstStep)
    logEvent('Survey opened', { utmKnown })
  }

  function close() {
    setStep('closed')
  }

  function advance(current: Step, nextStep: Step) {
    logEvent('Survey advance', { from: current, to: nextStep })
    setStep(nextStep)
  }

  function submit() {
    logEvent('Survey submitted', { answers })
    setStep('done')
  }

  if (step === 'closed') {
    return (
      <button
        onClick={open}
        className="w-full text-left rounded-xl border border-border bg-glow-50 hover:border-glow-400 hover:bg-glow-100 transition-all p-5 group"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-glow-800 mb-1 uppercase tracking-wider">
              Help us help others
            </div>
            <div className="font-semibold">Quick {utmKnown ? '4' : '5'}-question survey · ~60 seconds</div>
            <div className="text-sm text-muted-foreground mt-1">
              Tell us how you found us and what mattered — it shapes how we
              build Chaiz.
            </div>
          </div>
          <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </div>
      </button>
    )
  }

  if (step === 'done') {
    return (
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm text-center space-y-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-glow-400">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 12 10 18 20 6" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Thanks for sharing</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Your answers help us make Chaiz better.
        </p>
      </div>
    )
  }

  // Progress (caps at 3 segments — per user spec)
  const totalVisible = 3
  const userVisibleIdx = utmKnown ? Number(step) - 1 : Number(step)
  const filled = Math.min(totalVisible, userVisibleIdx)

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex gap-1 flex-1 max-w-32">
            {Array.from({ length: totalVisible }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < filled ? 'bg-foreground' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {filled} of {totalVisible}
          </div>
        </div>
        <button
          onClick={close}
          className="text-muted-foreground hover:text-foreground p-1 -mr-1"
          aria-label="Close survey"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </div>

      {step === 1 && (
        <Q1Panel
          options={options.q1}
          value={answers.source}
          otherText={answers.sourceOther}
          onChange={(val, otherText) => {
            setAnswers((a) => ({ ...a, source: val, sourceOther: otherText }))
            logEvent('Survey answer', { q: 1, value: val, other: otherText })
          }}
          onNext={() => advance(1, 2)}
        />
      )}

      {step === 2 && (
        <Q2Panel
          options={options.q2}
          value={answers.preChoice}
          onChange={(val) => {
            setAnswers((a) => ({ ...a, preChoice: val }))
            logEvent('Survey answer', { q: 2, value: val })
            advance(2, 3)
          }}
          onSkip={() => advance(2, 3)}
        />
      )}

      {step === 3 && (
        <Q3Panel
          options={options.q3}
          value={answers.drivers ?? []}
          onChange={(val) =>
            setAnswers((a) => ({ ...a, drivers: val }))
          }
          onNext={() => {
            logEvent('Survey answer', { q: 3, values: answers.drivers })
            advance(3, 4)
          }}
          onSkip={() => advance(3, 4)}
        />
      )}

      {step === 4 && (
        <Q4Panel
          options={options.q4}
          value={answers.features ?? []}
          microcopyVisible={microcopyVisible}
          onFirstTap={() => setMicrocopyVisible(false)}
          onChange={(val) =>
            setAnswers((a) => ({ ...a, features: val }))
          }
          onNext={() => {
            logEvent('Survey answer', { q: 4, values: answers.features })
            advance(4, 5)
          }}
          onSkip={() => advance(4, 5)}
        />
      )}

      {step === 5 && (
        <Q5Panel
          rating={answers.rating}
          feedback={answers.feedback ?? ''}
          onRating={(r) => {
            setAnswers((a) => ({ ...a, rating: r }))
            logEvent('Survey answer', { q: 5, rating: r })
          }}
          onFeedback={(t) => setAnswers((a) => ({ ...a, feedback: t }))}
          onSubmit={submit}
        />
      )}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────
// Question panels
// ───────────────────────────────────────────────────────────────

function Q1Panel({
  options,
  value,
  otherText,
  onChange,
  onNext,
}: {
  options: Option[]
  value?: string
  otherText?: string
  onChange: (val: string, otherText?: string) => void
  onNext: () => void
}) {
  const isOther = value === 'other'

  return (
    <div>
      <QuestionHeader title="How did you first hear about Chaiz?" required />
      <RadioList
        options={options}
        value={value}
        onChange={(v) => {
          onChange(v, v === 'other' ? otherText ?? '' : undefined)
          if (v !== 'other') onNext()
        }}
      />
      {isOther && (
        <div className="mt-4 space-y-3">
          <input
            autoFocus
            value={otherText ?? ''}
            onChange={(e) => onChange('other', e.target.value)}
            placeholder="Tell us where…"
            className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          />
          <div className="flex justify-end">
            <button
              onClick={onNext}
              disabled={!otherText?.trim()}
              className="h-10 px-5 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Q2Panel({
  options,
  value,
  onChange,
  onSkip,
}: {
  options: Option[]
  value?: string
  onChange: (val: string) => void
  onSkip: () => void
}) {
  return (
    <div>
      <QuestionHeader title="What were you thinking about doing before you chose Chaiz?" />
      <RadioList options={options} value={value} onChange={onChange} />
      <FooterActions onSkip={onSkip} showNext={false} />
    </div>
  )
}

function Q3Panel({
  options,
  value,
  onChange,
  onNext,
  onSkip,
}: {
  options: Option[]
  value: string[]
  onChange: (val: string[]) => void
  onNext: () => void
  onSkip: () => void
}) {
  return (
    <MultiSelectPanel
      title="What mattered most in your decision to buy through Chaiz?"
      hint="Choose up to 3"
      options={options}
      value={value}
      onChange={onChange}
      onNext={onNext}
      onSkip={onSkip}
    />
  )
}

function Q4Panel({
  options,
  value,
  microcopyVisible,
  onFirstTap,
  onChange,
  onNext,
  onSkip,
}: {
  options: Option[]
  value: string[]
  microcopyVisible: boolean
  onFirstTap: () => void
  onChange: (val: string[]) => void
  onNext: () => void
  onSkip: () => void
}) {
  return (
    <div>
      {microcopyVisible && (
        <div className="text-xs font-medium text-glow-800 mb-3 flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
          Almost there, 2 more
        </div>
      )}
      <MultiSelectPanel
        title="What was most helpful in making your decision?"
        hint="Choose up to 3"
        options={options}
        value={value}
        onChange={(v) => {
          if (microcopyVisible) onFirstTap()
          onChange(v)
        }}
        onNext={onNext}
        onSkip={onSkip}
      />
    </div>
  )
}

function Q5Panel({
  rating,
  feedback,
  onRating,
  onFeedback,
  onSubmit,
}: {
  rating?: number
  feedback: string
  onRating: (r: number) => void
  onFeedback: (t: string) => void
  onSubmit: () => void
}) {
  const showPositive = rating !== undefined && rating >= 4
  const showNegative = rating !== undefined && rating <= 3

  return (
    <div>
      <QuestionHeader title="How was your buying experience?" />
      <StarRating value={rating} onChange={onRating} />

      {(showPositive || showNegative) && (
        <div className="mt-5 space-y-2">
          <label className="text-sm font-medium block">
            {showPositive
              ? 'Glad to hear it! Anything we should keep doing?'
              : 'We want to do better. What could we improve?'}
          </label>
          <textarea
            value={feedback}
            onChange={(e) => onFeedback(e.target.value)}
            rows={2}
            placeholder="Optional"
            className="w-full rounded-md border border-border bg-background p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          />
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onSubmit}
          className="text-sm text-muted-foreground hover:text-foreground px-3"
        >
          Skip
        </button>
        <button
          onClick={onSubmit}
          disabled={rating === undefined}
          className="h-10 px-5 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────
// Shared UI primitives
// ───────────────────────────────────────────────────────────────

function QuestionHeader({
  title,
  hint,
  required,
}: {
  title: string
  hint?: string
  required?: boolean
}) {
  return (
    <div className="mb-5">
      <h3 className="text-xl font-semibold leading-snug">
        {title}
        {required && (
          <span
            aria-hidden
            className="text-glow-700 ml-1"
            title="Required"
          >
            *
          </span>
        )}
      </h3>
      {hint && (
        <p className="text-sm text-muted-foreground mt-1">{hint}</p>
      )}
    </div>
  )
}

function RadioList({
  options,
  value,
  onChange,
}: {
  options: Option[]
  value?: string
  onChange: (val: string) => void
}) {
  return (
    <ul className="space-y-2">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <li key={opt.value}>
            <button
              onClick={() => onChange(opt.value)}
              className={`w-full text-left flex items-center gap-3 rounded-md border px-4 py-3 text-sm transition-colors ${
                selected
                  ? 'border-foreground bg-muted'
                  : 'border-border hover:border-foreground hover:bg-muted'
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full border-2 shrink-0 transition-colors ${
                  selected ? 'border-foreground' : 'border-input'
                } relative`}
              >
                {selected && (
                  <span className="absolute inset-1 rounded-full bg-foreground" />
                )}
              </span>
              <span>{opt.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function MultiSelectPanel({
  title,
  hint,
  options,
  value,
  onChange,
  onNext,
  onSkip,
}: {
  title: string
  hint: string
  options: Option[]
  value: string[]
  onChange: (val: string[]) => void
  onNext: () => void
  onSkip: () => void
}) {
  const MAX = 3
  const atMax = value.length >= MAX

  function toggle(v: string) {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v))
    } else if (!atMax) {
      onChange([...value, v])
    }
  }

  return (
    <div>
      <QuestionHeader title={title} hint={hint} />
      <ul className="space-y-2">
        {options.map((opt) => {
          const selected = value.includes(opt.value)
          const disabled = !selected && atMax
          return (
            <li key={opt.value}>
              <button
                onClick={() => toggle(opt.value)}
                disabled={disabled}
                className={`w-full text-left flex items-center gap-3 rounded-md border px-4 py-3 text-sm transition-colors ${
                  selected
                    ? 'border-foreground bg-muted'
                    : disabled
                      ? 'border-border opacity-50 cursor-not-allowed'
                      : 'border-border hover:border-foreground hover:bg-muted'
                }`}
              >
                <span
                  className={`h-4 w-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${
                    selected
                      ? 'border-foreground bg-foreground'
                      : 'border-input'
                  }`}
                >
                  {selected && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 text-background"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="4 12 10 18 20 6" />
                    </svg>
                  )}
                </span>
                <span>{opt.label}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <FooterActions
        onSkip={onSkip}
        onNext={onNext}
        nextDisabled={value.length === 0}
        counter={
          value.length > 0 ? `${value.length} of ${MAX} selected` : undefined
        }
      />
    </div>
  )
}

function FooterActions({
  onSkip,
  onNext,
  showNext = true,
  nextDisabled,
  counter,
}: {
  onSkip: () => void
  onNext?: () => void
  showNext?: boolean
  nextDisabled?: boolean
  counter?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 mt-6">
      <div className="text-xs text-muted-foreground">{counter ?? ''}</div>
      <div className="flex items-center gap-3">
        <button
          onClick={onSkip}
          className="text-sm text-muted-foreground hover:text-foreground px-3"
        >
          Skip
        </button>
        {showNext && onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className="h-10 px-5 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  )
}

function StarRating({
  value,
  onChange,
}: {
  value?: number
  onChange: (v: number) => void
}) {
  const [hover, setHover] = useState<number | undefined>(undefined)
  const display = hover ?? value ?? 0

  return (
    <div
      className="flex gap-1"
      onMouseLeave={() => setHover(undefined)}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= display
        return (
          <button
            key={n}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            className="p-1 -m-1"
            aria-label={`${n} star${n === 1 ? '' : 's'}`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-9 w-9 transition-colors ${
                active ? 'text-glow-400' : 'text-border'
              }`}
              fill="currentColor"
              stroke={active ? 'none' : 'currentColor'}
              strokeWidth="1.5"
              strokeLinejoin="round"
            >
              <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

