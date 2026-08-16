import { z } from 'zod';
import { ProjectType, SnapshotReason } from '@saasx/shared';

// Extensible project state
export const ProjectStateSchema = z.object({
  version: z.number().int().min(1),
  metadata: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
  }).catchall(z.any()),
  pages: z.array(z.any()),
  screens: z.array(z.any()),
  workflows: z.array(z.any()),
  dataModels: z.array(z.any()),
  settings: z.record(z.string(), z.any()),
});

export const CreateProjectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: z.nativeEnum(ProjectType),
  state: ProjectStateSchema,
});

export const UpdateProjectStateSchema = z.object({
  state: ProjectStateSchema,
  reason: z.nativeEnum(SnapshotReason).optional(),
});
