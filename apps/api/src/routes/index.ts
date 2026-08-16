import { Router } from 'express';
import healthRoutes from './health.routes.js';
import paymentRoutes from './payment.routes.js';
import workflowRoutes from './workflow.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/', paymentRoutes);
router.use('/', workflowRoutes);

export default router;
