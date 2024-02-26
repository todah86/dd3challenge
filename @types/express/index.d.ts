// @types/types.d.ts

import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      palabraSecreta?: string;
    }
  }
}
