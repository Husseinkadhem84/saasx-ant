import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';

export const generalRateLimit = rateLimit({
  windowMs: config.API_RATE_LIMIT_WINDOW_MS,
  max: config.API_RATE_LIMIT_MAX,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const aiRateLimit = rateLimit({
  windowMs: config.AI_RATE_LIMIT_WINDOW_MS,
  max: config.AI_RATE_LIMIT_MAX,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many AI generation requests, please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});
