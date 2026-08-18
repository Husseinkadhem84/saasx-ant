import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { CreateProjectSchema, UpdateProjectStateSchema } from '../utils/validation.js';
import * as projectController from '../controllers/project.controller.js';

const router = Router();

// All project routes require authentication
router.use(requireAuth);

router.get('/', projectController.listProjects);
router.post('/', validateRequest(CreateProjectSchema), projectController.createProject);

router.get('/:id', projectController.getProject);
router.patch('/:id/state', validateRequest(UpdateProjectStateSchema), projectController.updateProjectState);
router.get('/:id/snapshots', projectController.getProjectSnapshots);

export default router;
