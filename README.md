# Chaiz Design Sandbox

Private playground for iterating on Chaiz design tickets. Each ticket becomes a route. Open the sandbox, click a project, see the prototype.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (tokens in `src/index.css` via `@theme inline`)
- react-router-dom for routing
- Chaiz Design System tokens wired via CSS variables (semantic colors, Glow accent, Poppins font)

## Run it

```bash
npm install
npm run dev
# open http://localhost:5173
```

## How it's organized

```
src/
├── index.css              # Tailwind + Chaiz tokens (CSS vars + @theme inline)
├── main.tsx               # Entry, sets up BrowserRouter
├── App.tsx                # Router root — registers every project as /<slug>
├── layout/Shell.tsx       # Header + content container
├── pages/HomePage.tsx     # Grid of project cards
└── projects/
    ├── registry.ts        # Import + register each project here
    └── <slug>/
        ├── index.tsx      # The prototype (default export = React component)
        ├── ticket.md      # Pasted ticket description
        ├── research.md    # (optional) competitive / existing patterns
        └── proposal.md    # Short solution shape + any pushback
```

## Adding a new project manually

1. Create `src/projects/<slug>/index.tsx` with `export default function ...`
2. Add a ticket.md and proposal.md next to it
3. Register in `src/projects/registry.ts`
4. Visit `/<slug>`

Or run the `/chaiz-design` Claude Code skill with a ticket and it'll scaffold this for you.

## Tokens available

- **Semantic**: `bg-background`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-destructive`, etc.
- **Glow accent**: `bg-glow-{50,100,200,300,400,600,700,800,900,950}`
- **Font**: Poppins via `font-sans` (default)
- **Radii**: `rounded-sm/md/lg/xl`
- **Dark mode**: add `dark` class to `<html>` or any ancestor

See `src/projects/hello-chaiz/index.tsx` for usage examples.
