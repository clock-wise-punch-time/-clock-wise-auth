import { Request } from 'express';

export interface JWTDecryptPayload {
  user_id: string;
  role: string;
}

export type RequestUser = {
  user: JWTDecryptPayload;
} & Partial<Request>;
