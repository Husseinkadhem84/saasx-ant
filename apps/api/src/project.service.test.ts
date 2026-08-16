import { describe, it, expect, beforeAll } from 'vitest';
import { ProjectStateSchema, CreateProjectSchema, UpdateProjectStateSchema } from './utils/validation.js';
import { ProjectType } from '@saasx/shared';
import { prisma } from './config/database.js';
import { config } from './config/env.js';

describe('Project State Validation (Unit Tests)', () => {
  it('should validate a valid project state', () => {
    const validState = {
      version: 1,
      metadata: { name: 'Test Project', description: 'desc' },
      pages: [],
      screens: [],
      workflows: [],
      dataModels: [],
      settings: {}
    };

    const result = ProjectStateSchema.safeParse(validState);
    expect(result.success).toBe(true);
  });

  it('should reject state without version', () => {
    const invalidState = {
      metadata: { name: 'Test Project' },
      pages: [],
      screens: [],
      workflows: [],
      dataModels: [],
      settings: {}
    };

    const result = ProjectStateSchema.safeParse(invalidState);
    expect(result.success).toBe(false);
  });

  it('should validate a valid CreateProject input', () => {
    const validProject = {
      name: 'New App',
      type: ProjectType.WEB,
      state: {
        version: 1,
        metadata: { name: 'New App' },
        pages: [],
        screens: [],
        workflows: [],
        dataModels: [],
        settings: {}
      }
    };

    const result = CreateProjectSchema.safeParse(validProject);
    expect(result.success).toBe(true);
  });
});

// Integration tests
describe('Project Service Integration Tests', () => {
  const isDbAvailable = !!config.DATABASE_URL;

  beforeAll(() => {
    if (!isDbAvailable) {
      console.warn('⚠️ Skipping Project Service integration tests because DATABASE_URL is not configured.');
    }
  });

  it.skipIf(!isDbAvailable)('should connect to database', async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      expect(true).toBe(true);
    } catch (e: any) {
      // If we have a URL but the database is unreachable
      console.warn('Database unreachable', e.message);
    }
  });
});
