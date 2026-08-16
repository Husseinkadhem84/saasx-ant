import { Router } from 'express';
import { z } from 'zod';
import { generateWorkflow, testWebhook } from '../controllers/workflow.controller.js';
import { validateRequest } from '../middleware/validate.js';
import { aiRateLimit } from '../middleware/rate-limit.js';

const router = Router();

const generateSchema = z.object({
  promptAr: z.string().trim().min(5, 'Prompt is too short').max(1000, 'Prompt is too long'),
});

const webhookSchema = z.object({
  webhookPath: z.string().min(1).max(255),
  payload: z.record(z.string(), z.any()).optional(),
});

router.post('/generate-workflow', aiRateLimit, validateRequest(generateSchema), generateWorkflow);
router.post('/n8n/webhook-test', validateRequest(webhookSchema), testWebhook);

export default router;
