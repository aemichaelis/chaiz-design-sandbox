import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Shell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="font-semibold text-foreground hover:opacity-80"
          >
            Chaiz{' '}
            <span className="text-muted-foreground font-normal">
              Design Sandbox
            </span>
          </Link>
          {!onHome && (
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← All projects
            </Link>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}
