// authenticateToken.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    // Asume que el payload del token contiene el ID del usuario en el campo '_id'
    if (typeof decoded === 'object' && decoded !== null && '_id' in decoded) {
      req.user = { _id: decoded._id };
    } else {
      return res.sendStatus(403);
    }
    next();
  });
};

export default authenticateToken;

