# Unified DevOps Dashboard (GitHub + Slack + Jira)

A full‑stack template that runs locally in Visual Studio/VS Code and pushes to GitHub. It provides:
- OAuth login buttons for GitHub, Slack, and Jira (Atlassian)
- A common landing page (Dashboard) that pulls sample/workspace data
- `MOCK_MODE` to run without configuring real OAuth yet

## Quick Start (Mock Mode)
```bash
# in repo root
npm install
npm run dev
```
- Client (Vite React): http://localhost:5173
- Server (Express): http://localhost:4000

## Real Integrations (Optional)
1. Copy `server/.env.example` to `server/.env` and fill values.
2. In `server/.env`, set `MOCK_MODE=false` and configure OAuth apps:
   - **GitHub:** https://github.com/settings/developers
   - **Slack:** https://api.slack.com/apps
   - **Atlassian (Jira):** https://developer.atlassian.com/console/myapps/
3. Update OAuth callback URLs to:
   - GitHub: `http://localhost:4000/auth/github/callback`
   - Slack:  `http://localhost:4000/auth/slack/callback`
   - Jira:   `http://localhost:4000/auth/jira/callback`

## Scripts
- `npm run dev` — starts server and client concurrently
- `npm run build` — builds the client
- `npm start` — starts the server (serves built client)

## Deploy
- **GitHub Codespaces**: open the repo, run `npm install && npm run dev`.
- **Render/Heroku/Fly.io**: point to `server` for web process; set env vars; ensure `client` is built and served from `server`.
- **GitHub Pages** (client only): run `npm --prefix client run build` and publish `client/dist` (no server features).

> Note: OAuth flows require HTTPS in production and secure cookie settings.
