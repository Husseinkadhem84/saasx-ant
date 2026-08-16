import { Router } from 'express';
import { z } from 'zod';
import { processZainCashPayment, processFastPayPayment } from '../controllers/payment.controller.js';
import { validateRequest } from '../middleware/validate.js';

const router = Router();

const zainCashSchema = z.object({
  amountIqd: z.number().min(250).max(10000000),
  phone: z.string().min(10).max(15),
  orderTitle: z.string().max(100).optional(),
});

const fastPaySchema = z.object({
  amountIqd: z.number().min(250).max(10000000),
  phone: z.string().min(10).max(15),
});

router.post('/zaincash/pay', validateRequest(zainCashSchema), processZainCashPayment);
router.post('/fastpay/pay', validateRequest(fastPaySchema), processFastPayPayment);

export default router;
