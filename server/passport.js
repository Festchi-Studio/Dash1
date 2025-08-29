import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GitHubStrategy } from 'passport-github2';
import SlackStrategy from 'passport-slack-oauth2';
import AtlassianStrategy from 'passport-atlassian-oauth2';

dotenv.config();

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// GitHub
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${SERVER_URL}/auth/github/callback`,
    scope: ['read:user', 'repo']
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, { provider: 'github', accessToken, profile });
  }));
}

// Slack
if (process.env.SLACK_CLIENT_ID && process.env.SLACK_CLIENT_SECRET) {
  passport.use(new SlackStrategy({
    clientID: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    callbackURL: `${SERVER_URL}/auth/slack/callback`,
    scope: ['users:read', 'channels:read', 'chat:write'],
  }, (accessToken, refreshToken, params, profile, done) => {
    return done(null, { provider: 'slack', accessToken, profile });
  }));
}

// Atlassian (Jira)
if (process.env.ATLASSIAN_CLIENT_ID && process.env.ATLASSIAN_CLIENT_SECRET) {
  passport.use(new AtlassianStrategy({
    clientID: process.env.ATLASSIAN_CLIENT_ID,
    clientSecret: process.env.ATLASSIAN_CLIENT_SECRET,
    callbackURL: `${SERVER_URL}/auth/jira/callback`,
    scope: ['read:jira-user', 'read:jira-work', 'offline_access']
  }, (accessToken, refreshToken, params, profile, done) => {
    return done(null, { provider: 'jira', accessToken, refreshToken, profile });
  }));
}

export default passport;
