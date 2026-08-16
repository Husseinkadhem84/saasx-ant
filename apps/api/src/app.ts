import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/error-handler.js';
import { generalRateLimit } from './middleware/rate-limit.js';
import { AppError } from './utils/AppError.js';
import apiRoutes from './routes/index.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ 
  origin: config.CORS_ORIGIN.split(',').map(o => o.trim()),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json({ limit: '1mb' }));

// Logging
app.use(requestLogger);

// Global Rate Limiting
app.use('/api', generalRateLimit);

// API Routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(new AppError(404, 'NOT_FOUND', 'The requested resource was not found.'));
});

// Global Error Handler
app.use(errorHandler);

export default app;
