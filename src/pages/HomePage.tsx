import { Link } from 'react-router-dom'
import { projects } from '../projects/registry'

export function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-2 tracking-tight">
        Design Projects
      </h1>
      <p className="text-muted-foreground mb-10">
        Each ticket lives as its own route. Click a card to open the prototype.
      </p>
      {projects.length === 0 ? (
        <div className="rounded-xl border border-border p-10 text-center bg-card">
          <p className="text-muted-foreground">
            No projects yet — run{' '}
            <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">
              /chaiz-design
            </code>{' '}
            with a ticket to create one.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/${p.slug}`}
                className="block rounded-xl border border-border p-6 bg-card hover:border-primary transition-colors shadow-sm"
              >
                <div className="text-xs font-medium text-muted-foreground mb-1 font-mono">
                  {p.slug}
                </div>
                <h2 className="text-lg font-semibold mb-2 text-card-foreground">
                  {p.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {p.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
