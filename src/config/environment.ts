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
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    cookieSecret: process.env.COOKIE_SECRET || 'cookie-secret',
    cookieMaxAge: parseInt(process.env.COOKIE_MAX_AGE || '86400000'), // 24h
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    // OpenID Connect Configuration
    openid: {
        issuer: process.env.OPENID_ISSUER || 'http://localhost:8080/realms/master',
        clientID: process.env.OPENID_CLIENT_ID,
        clientSecret: process.env.OPENID_CLIENT_SECRET,
        callbackURL: process.env.OPENID_CALLBACK_URL || 'http://localhost:3000/auth/openid/callback',
        scope: ['openid', 'profile', 'email']
    },
    // GitHub OAuth Configuration
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
        scope: ['user:email']
    }
};