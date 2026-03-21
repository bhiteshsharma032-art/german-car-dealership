import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/auth';
import { createError } from './errorHandler';

export interface AuthRequest extends Request {
  user?: TokenPayload;
  body: any;
  params: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('Keine Authentifizierung vorhanden', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    const payload = verifyToken(token);

    if (!payload) {
      throw createError('Ungültiger oder abgelaufener Token', 401);
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'admin') {
    throw createError('Zugriff verweigert. Admin-Rechte erforderlich.', 403);
  }
  next();
};
