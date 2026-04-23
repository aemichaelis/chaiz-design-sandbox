const glowShades = [
  { step: 50, className: 'bg-glow-50 text-foreground' },
  { step: 100, className: 'bg-glow-100 text-foreground' },
  { step: 200, className: 'bg-glow-200 text-foreground' },
  { step: 300, className: 'bg-glow-300 text-foreground' },
  { step: 400, className: 'bg-glow-400 text-foreground' },
  { step: 600, className: 'bg-glow-600 text-white' },
  { step: 700, className: 'bg-glow-700 text-white' },
  { step: 800, className: 'bg-glow-800 text-white' },
  { step: 900, className: 'bg-glow-900 text-white' },
  { step: 950, className: 'bg-glow-950 text-white' },
]

export default function HelloChaiz() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl font-semibold mb-3 tracking-tight">
          Hello Chaiz
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Sample prototype to verify tokens render: Poppins font, deep teal
          foreground on white, Glow brand accent.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Semantic colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Swatch
            label="background"
            className="bg-background border border-border text-foreground"
          />
          <Swatch label="foreground" className="bg-foreground text-background" />
          <Swatch
            label="primary"
            className="bg-primary text-primary-foreground"
          />
          <Swatch label="muted" className="bg-muted text-muted-foreground" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Glow accent</h2>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {glowShades.map((s) => (
            <div
              key={s.step}
              className={`h-16 rounded-md flex items-end p-2 text-xs font-medium ${s.className}`}
            >
              {s.step}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 h-10 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            Primary
          </button>
          <button className="px-4 h-10 rounded-md bg-glow-400 text-foreground font-medium hover:bg-glow-300 transition-colors">
            Glow
          </button>
          <button className="px-4 h-10 rounded-md border border-border bg-background text-foreground font-medium hover:bg-muted transition-colors">
            Secondary
          </button>
          <button className="px-4 h-10 rounded-md bg-destructive text-white font-medium hover:opacity-90 transition-opacity">
            Destructive
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Typography</h2>
        <div className="space-y-2">
          <p className="text-4xl font-semibold">Heading XXXL · 32px</p>
          <p className="text-3xl font-semibold">Heading XXL · 28px</p>
          <p className="text-2xl font-semibold">Heading XL · 24px</p>
          <p className="text-xl font-semibold">Heading L · 20px</p>
          <p className="text-base font-semibold">Heading M · 16px</p>
          <p className="text-base">Body regular · 16px</p>
          <p className="text-sm text-muted-foreground">
            Body small muted · 14px
          </p>
        </div>
      </section>
    </div>
  )
}

function Swatch({
  label,
  className,
}: {
  label: string
  className: string
}) {
  return (
    <div
      className={`h-24 rounded-lg p-3 flex items-end text-sm font-medium ${className}`}
    >
      {label}
    </div>
  )
}
