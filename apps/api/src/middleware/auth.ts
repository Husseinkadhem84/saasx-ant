import { Request, Response, NextFunction } from 'express';
import { supabaseClient } from '../config/supabase.js';
import { AppError } from '../utils/AppError.js';
import { config } from '../config/env.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'UNAUTHORIZED', 'Authentication required.');
    }

    const token = authHeader.split(' ')[1];
    
    // In test environment, if no supabase client is configured, we can allow a mock token for testing
    if (config.NODE_ENV === 'test' && token === 'mock-valid-token') {
      req.user = { id: 'test-user-123', email: 'test@example.com' };
      return next();
    }

    if (config.NODE_ENV === 'test') { throw new AppError(401, 'UNAUTHORIZED', 'Invalid or expired token.'); }

    if (!supabaseClient) {
      throw new AppError(500, 'INTERNAL_SERVER_ERROR', 'Auth service is not configured.');
    }

    const { data, error } = await supabaseClient.auth.getUser(token);

    if (error || !data.user) {
      throw new AppError(401, 'UNAUTHORIZED', 'Invalid or expired token.');
    }

    req.user = {
      id: data.user.id,
      email: data.user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const requireUser = (req: AuthenticatedRequest): { id: string; email?: string } => {
  if (!req.user || !req.user.id) {
    throw new AppError(401, 'UNAUTHORIZED', 'Authentication required.');
  }
  return req.user;
};
