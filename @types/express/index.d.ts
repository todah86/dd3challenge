// types.d.ts

import { JwtPayload } from 'jsonwebtoken';

declare namespace Express {
  export interface Request {
    user?: JwtPayload | string;
  }
}


declare namespace Express {
    export interface Request {
      palabraSecreta?: string;
    }
  }
  