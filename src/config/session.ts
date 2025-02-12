import { createClient } from 'redis';
import { RedisClientType } from 'redis';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { config } from './environment';
import { logger } from '../utils/logger';

const redisClient: RedisClientType = createClient({
    url: config.redisUrl
});

redisClient.connect().catch(console.error);

const store = new RedisStore({
    client: redisClient,
    prefix: 'auth:'
});

// Log session events
store.on('connect', () => logger.info('Redis session store connected'));
store.on('disconnect', () => logger.warn('Redis session store disconnected'));
store.on('error', (err) => logger.error('Redis session store error:', err));

export const sessionConfig: session.SessionOptions = {
    store,
    secret: config.cookieSecret,
    name: 'sessionId',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    proxy: true,
    cookie: {
        secure: config.nodeEnv === 'production',
        httpOnly: true,
        maxAge: config.cookieMaxAge,
        sameSite: 'lax'
    }
}; 