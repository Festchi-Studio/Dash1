import React, { useEffect, useState } from 'react'

export default function Dashboard() {
  const [repos, setRepos] = useState([])
  const [channels, setChannels] = useState([])
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const [r1, r2, r3] = await Promise.all([
          fetch('/api/github/repos', { credentials: 'include' }),
          fetch('/api/slack/channels', { credentials: 'include' }),
          fetch('/api/jira/issues', { credentials: 'include' })
        ])
        if (!r1.ok || !r2.ok || !r3.ok) throw new Error('Failed to fetch one or more resources')
        setRepos(await r1.json())
        setChannels(await r2.json())
        setIssues(await r3.json())
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>Loading dashboard…</p>
  if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>

  return (
    <div>
      <h2>Common Landing Page</h2>
      <p>This dashboard unifies key data from GitHub, Slack, and Jira.</p>

      <section style={section}>
        <h3>GitHub Repos</h3>
        <div style={grid}>
          {repos.map((r, i) => (
            <Card key={i} title={r.name}>
              <p>⭐ Stars: {r.stars}</p>
              <p>🐞 Open issues: {r.openIssues}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={section}>
        <h3>Slack Channels</h3>
        <div style={grid}>
          {channels.map((c) => (
            <Card key={c.id} title={`#${c.name}`}>
              <p>Members: {c.members ?? '—'}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={section}>
        <h3>Jira Issues</h3>
        <div style={grid}>
          {issues.map((it) => (
            <Card key={it.key} title={it.key}>
              <p>{it.summary}</p>
              <p>Status: {it.status}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{title}</strong>
      </div>
      <div style={{ marginTop: 8 }}>
        {children}
      </div>
    </div>
  )
}

const section = { margin: '24px 0' }
const grid = { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }
const card = { border: '1px solid #eee', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }
