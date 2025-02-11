import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './environment';
import { AuthService } from '../services/authService';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId!,
      clientSecret: config.googleClientSecret!,
      callbackURL: config.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const authResponse = await AuthService.validateGoogleUser(profile);
        return done(null, authResponse);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;