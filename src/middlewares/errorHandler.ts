import { Request, Response, NextFunction } from 'express';
import { AuthError } from '../types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AuthError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
};