import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';
import { logger } from '../utils/logger';

interface SessionWithViewed extends Session {
    viewed?: boolean;
}

export const sessionLogger = (req: Request, res: Response, next: NextFunction) => {
    const session = req.session as SessionWithViewed;
    
    // Log new session creation
    if (session && !session.viewed) {
        session.viewed = true;
        logger.info(`New session created: ${req.sessionID}`);
        
        // Log session data
        logger.info('Session data:', {
            id: req.sessionID,
            user: req.user,
            ip: req.ip,
            userAgent: req.get('user-agent')
        });
    }

    // Log session destruction
    res.on('finish', () => {
        if (session && !session.viewed) {
            logger.info(`Session destroyed: ${req.sessionID}`);
        }
    });

    next();
}; 