import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as OpenIDStrategy, VerifyCallback, Profile as OpenIDProfile } from 'passport-openidconnect';
import { config } from './environment';
import { AuthService } from '../services/authService';

// Configuration de la stratégie Google OAuth2.0
passport.use(
  'google',
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

// Configuration de la stratégie OpenID Connect
passport.use(
  'openid',
  new OpenIDStrategy(
    {
      issuer: config.openid.issuer,
      authorizationURL: `${config.openid.issuer}/protocol/openid-connect/auth`,
      tokenURL: `${config.openid.issuer}/protocol/openid-connect/token`,
      userInfoURL: `${config.openid.issuer}/protocol/openid-connect/userinfo`,
      clientID: config.openid.clientID!,
      clientSecret: config.openid.clientSecret!,
      callbackURL: config.openid.callbackURL,
      scope: config.openid.scope
    },
    async (issuer: string, profile: OpenIDProfile, done: VerifyCallback) => {
      try {
        const authResponse = await AuthService.validateOpenIDUser(profile);
        return done(null, authResponse);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

export default passport;