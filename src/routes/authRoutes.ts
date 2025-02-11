import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/authController';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  AuthController.googleCallback
);

router.get('/verify', AuthController.verifyToken);
router.post('/logout', AuthController.logout);

export default router;