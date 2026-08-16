import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { config } from '../config/env.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.name === 'ZodError') {
    const issues = err.errors || err.issues || [];
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: issues.map((e: any) => ({ path: e.path?.join('.') || '', message: e.message })),
      },
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  console.error(`[UNHANDLED ERROR] ${err.name}: ${err.message}`);
  if (config.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.',
    },
  });
}