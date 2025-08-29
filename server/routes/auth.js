import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Basic user helpers
router.get('/me', (req, res) => {
  res.json({ user: req.user || null });
});
router.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    req.session.destroy(() => res.json({ ok: true }));
  });
});

// GitHub
router.get('/github', passport.authenticate('github', { session: true }));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/', session: true }),
  (req, res) => res.redirect('/dashboard')
);

// Slack
router.get('/slack', passport.authenticate('slack', { session: true }));
router.get('/slack/callback',
  passport.authenticate('slack', { failureRedirect: '/', session: true }),
  (req, res) => res.redirect('/dashboard')
);

// Jira
router.get('/jira', passport.authenticate('atlassian', { session: true }));
router.get('/jira/callback',
  passport.authenticate('atlassian', { failureRedirect: '/', session: true }),
  (req, res) => res.redirect('/dashboard')
);

export default router;
