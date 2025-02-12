import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as OpenIDStrategy, VerifyCallback, Profile as OpenIDProfile } from 'passport-openidconnect';
import { config } from './environment';
import { AuthService } from '../services/authService';

// Serialization pour stocker l'utilisateur dans la session
passport.serializeUser((user: any, done) => {
  done(null, user);
});

// Deserialization pour récupérer l'utilisateur depuis la session
passport.deserializeUser((user: any, done) => {
  done(null, user);
});

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
      scope: config.openid.scope,
      prompt: 'login'
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