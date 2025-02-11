import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
    cookieSecret: process.env.COOKIE_SECRET || 'cookie-secret',
    cookieMaxAge: parseInt(process.env.COOKIE_MAX_AGE || '86400000'), // 24h
    // OpenID Connect Configuration
    openid: {
        issuer: process.env.OPENID_ISSUER || 'http://localhost:8080/realms/master',
        clientID: process.env.OPENID_CLIENT_ID,
        clientSecret: process.env.OPENID_CLIENT_SECRET,
        callbackURL: process.env.OPENID_CALLBACK_URL || 'http://localhost:3000/auth/openid/callback',
        scope: ['openid', 'profile', 'email']
    }
};