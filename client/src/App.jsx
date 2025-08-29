import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid #eee' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', fontWeight: 700 }}>Unified DevOps Dashboard</Link>
        <nav style={{ display: 'flex', gap: 12 }}>
          <a href="/auth/github">GitHub</a>
          <a href="/auth/slack">Slack</a>
          <a href="/auth/jira">Jira</a>
        </nav>
      </header>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
      <footer style={{ padding: 24, borderTop: '1px solid #eee', color: '#777' }}>
        Built with React + Express
      </footer>
    </div>
  )
}
