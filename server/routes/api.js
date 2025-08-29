import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const MOCK = (process.env.MOCK_MODE || 'true') === 'true';
const ATLASSIAN_CLOUD = process.env.ATLASSIAN_CLOUD || '';

function ensureAuth(req, res, next) {
  if (MOCK) return next();
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// GitHub
router.get('/github/repos', ensureAuth, async (req, res) => {
  if (MOCK) {
    return res.json([{ name: "example-repo", stars: 42, openIssues: 3 }]);
  }
  const token = req.user?.accessToken;
  const r = await axios.get('https://api.github.com/user/repos?per_page=10', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = r.data.map(repo => ({
    name: repo.full_name,
    stars: repo.stargazers_count,
    openIssues: repo.open_issues_count
  }));
  res.json(data);
});

// Slack
router.get('/slack/channels', ensureAuth, async (req, res) => {
  if (MOCK) {
    return res.json([
      { id: "C123", name: "general", members: 123 },
      { id: "C456", name: "devops", members: 42 }
    ]);
  }
  const token = req.user?.accessToken;
  const r = await axios.get('https://slack.com/api/conversations.list', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const channels = (r.data.channels || []).map(ch => ({
    id: ch.id, name: ch.name, members: ch.num_members
  }));
  res.json(channels);
});

// Jira
router.get('/jira/issues', ensureAuth, async (req, res) => {
  if (MOCK) {
    return res.json([
      { key: "PROJ-101", summary: "Fix login bug", status: "In Progress" },
      { key: "PROJ-102", summary: "Add Slack webhooks", status: "To Do" }
    ]);
  }
  const token = req.user?.accessToken;
  const jql = 'order by created desc';
  const r = await axios.get(`${ATLASSIAN_CLOUD}/rest/api/3/search?jql=${encodeURIComponent(jql)}&maxResults=10`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
  });
  const issues = (r.data.issues || []).map(i => ({
    key: i.key,
    summary: i.fields.summary,
    status: i.fields.status.name
  }));
  res.json(issues);
});

export default router;
