import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { config } from '../config/environment';
import { AuthenticationError } from '../utils/errors';
import { logger } from '../utils/logger';

export class AuthController {
  static async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AuthenticationError('Authentication failed');
      }

      const { user, token } = req.user as any;

      // Set HTTP-only cookie with the token
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      // Redirect to frontend with success
      res.redirect(`${config.frontendUrl}/auth/success?user=${encodeURIComponent(JSON.stringify({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture
      }))}`);

    } catch (error) {
      logger.error('Google callback error:', error);
      res.redirect(`${config.frontendUrl}/auth/error`);
    }
  }

  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        throw new AuthenticationError('No token provided');
      }

      const isValid = await AuthService.validateToken(token);
      
      if (!isValid) {
        throw new AuthenticationError('Invalid token');
      }

      res.json({ valid: true });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('jwt');
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }
}
