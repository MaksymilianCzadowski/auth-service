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

  static async openidCallback(req: Request, res: Response, next: NextFunction) {
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
      logger.error('OpenID callback error:', error);
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
      // Supprimer le cookie JWT
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: 'lax'
      });

      // Déconnecter Passport d'abord
      if (req.isAuthenticated()) {
        req.logout((err) => {
          if (err) {
            logger.error('Error logging out from Passport:', err);
            return next(err);
          }
          
          // Détruire la session après la déconnexion Passport
          if (req.session) {
            req.session.destroy((err) => {
              if (err) {
                logger.error('Error destroying session:', err);
                return next(err);
              }
              res.json({ message: 'Logged out successfully' });
            });
          } else {
            res.json({ message: 'Logged out successfully' });
          }
        });
      } else {
        // Si l'utilisateur n'est pas authentifié, nettoyer quand même la session
        if (req.session) {
          req.session.destroy((err) => {
            if (err) {
              logger.error('Error destroying session:', err);
              return next(err);
            }
            res.json({ message: 'Logged out successfully' });
          });
        } else {
          res.json({ message: 'Logged out successfully' });
        }
      }
    } catch (error) {
      logger.error('Logout error:', error);
      next(error);
    }
  }
}
