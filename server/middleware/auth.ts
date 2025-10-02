import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  try {
    const apiToken = await storage.getApiTokenByToken(token);
    
    if (!apiToken) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
