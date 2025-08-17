import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.substring(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const secret = process.env.JWT_SECRET ?? "";
    const payload = jwt.verify(token, secret);
    req.user = payload; // { sub, email, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
