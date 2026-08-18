import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, requireUser } from '../middleware/auth.js';
import * as projectService from '../services/project.service.js';
import { AppError } from '../utils/AppError.js';

export const listProjects = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = requireUser(req);
    const projects = await projectService.listProjectsByOwner(user.id);
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = requireUser(req);
    const { name, description, type, state } = req.body;
    
    const project = await projectService.createProject(user.id, {
      name,
      description,
      type,
      state
    });
    
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = requireUser(req);
    const { id } = req.params;
    
    const project = await projectService.getProjectById(user.id, id);
    if (!project) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', 'Project not found.');
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProjectState = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = requireUser(req);
    const { id } = req.params;
    const { state, reason } = req.body;
    
    const updated = await projectService.updateProjectState(user.id, id, state, reason);
    if (!updated) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', 'Project not found or unauthorized.');
    }
    
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const getProjectSnapshots = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = requireUser(req);
    const { id } = req.params;
    
    const snapshots = await projectService.getProjectSnapshots(user.id, id);
    if (!snapshots) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', 'Project not found or unauthorized.');
    }
    
    res.json({ success: true, data: snapshots });
  } catch (error) {
    next(error);
  }
};
