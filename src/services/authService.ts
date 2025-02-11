import { Profile } from 'passport-google-oauth20';
import { User } from '../models/user';
import { sign, SignOptions, Secret } from 'jsonwebtoken';
import { config } from '../config/environment';
import { AuthenticationError, ValidationError } from '../utils/errors';
import { logger } from '../utils/logger';

export class AuthService {
  static async validateGoogleUser(profile: Profile) {
    try {
      if (!profile.emails || !profile.emails[0].value) {
        throw new ValidationError('No email found in Google profile');
      }

      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          email,
          googleId: profile.id,
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          picture: profile.photos?.[0]?.value,
        });
        logger.info(`New user created with Google: ${email}`);
      } else if (!user.googleId) {
        user.googleId = profile.id;
        await user.save();
        logger.info(`Existing user linked with Google: ${email}`);
      }

      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      logger.error('Error in validateGoogleUser:', error);
      throw new AuthenticationError('Failed to authenticate with Google');
    }
  }

  static generateToken(user: any) {
    try {
      const signOptions: SignOptions = { expiresIn: '24h' };
      const secret: Secret = config.jwtSecret!;
      return sign(
        { id: user._id, email: user.email },
        secret,
        signOptions
      );
    } catch (error) {
      logger.error('Error generating token:', error);
      throw new AuthenticationError('Failed to generate authentication token');
    }
  }

  static async validateToken(token: string) {
    try {
      // Token validation logic here
      return true;
    } catch (error) {
      logger.error('Error validating token:', error);
      throw new AuthenticationError('Invalid token');
    }
  }
}