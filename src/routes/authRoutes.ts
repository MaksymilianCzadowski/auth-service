import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/authController';

const router = Router();

// Routes Google OAuth2.0
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  AuthController.googleCallback
);

// Routes OpenID Connect
router.get(
  '/openid',
  passport.authenticate('openid', {
    prompt: 'login'
  })
);

router.get(
  '/openid/callback',
  passport.authenticate('openid', { session: false }),
  AuthController.openidCallback
);

// Routes GitHub OAuth
router.get(
  '/github',
  passport.authenticate('github', { 
    scope: ['user:email'] 
  })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  AuthController.githubCallback
);

// Routes communes
router.get('/verify', AuthController.verifyToken);
router.post('/logout', AuthController.logout);

export default router;