import { Routes, Route } from 'react-router-dom'
import { Shell } from './layout/Shell'
import { HomePage } from './pages/HomePage'
import { projects } from './projects/registry'

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {projects.map((p) => (
          <Route
            key={p.slug}
            path={`/${p.slug}`}
            element={<p.Component />}
          />
        ))}
      </Routes>
    </Shell>
  )
}
