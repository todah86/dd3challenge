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
    // Almacena el payload decodificado en res.locals
    res.locals.user = decoded;
    next();
  });
};

export default authenticateToken;

