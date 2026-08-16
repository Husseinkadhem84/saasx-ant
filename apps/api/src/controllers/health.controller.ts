import { Request, Response } from 'express';
import { config } from '../config/env.js';

export const getHealth = (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'saasx-api',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV
  });
};
