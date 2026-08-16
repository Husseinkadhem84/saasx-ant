import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  GEMINI_API_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  API_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000), // 15 mins
  API_RATE_LIMIT_MAX: z.coerce.number().default(100),
  AI_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(3600000), // 1 hour
  AI_RATE_LIMIT_MAX: z.coerce.number().default(20),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const config = parsedEnv.data;