import { useState, useEffect } from 'react'
import Home from './pages/Home'

const ROUTES = {
  '/': Home,
}

function App() {
  const [path, setPath] = useState('/')
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const navigate = (to) => setPath(to)

  const Page = ROUTES[path] ?? (() => <h2>404 — Page not found</h2>)

  return (
    <div className="app">
      <nav className="nav">
        <span className="nav__brand">MyMedia</span>
        <button className="nav__home" onClick={() => navigate('/')}>Home</button>
        <button
          className="nav__theme"
          onClick={() => setIsDark(d => !d)}
          title="Toggle theme"
        >
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
      <main className="main">
        <Page navigate={navigate} />
      </main>
    </div>
  )
}

export default App
