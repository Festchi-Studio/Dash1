import React from 'react'

export default function Login() {
  return (
    <div style={{ maxWidth: 520, margin: '40px auto', textAlign: 'center' }}>
      <h1>Welcome</h1>
      <p>Sign in to connect your tools and view your integrated dashboard.</p>
      <div style={{ display: 'grid', gap: 12, marginTop: 20 }}>
        <a href="/auth/github" style={btn}>Continue with GitHub</a>
        <a href="/auth/slack" style={btn}>Continue with Slack</a>
        <a href="/auth/jira" style={btn}>Continue with Jira</a>
      </div>
    </div>
  )
}

const btn = {
  display: 'inline-block',
  padding: '12px 16px',
  border: '1px solid #ddd',
  borderRadius: 8,
  textDecoration: 'none',
  fontWeight: 600
}
