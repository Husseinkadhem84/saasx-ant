import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from './app.js';
import * as projectService from './services/project.service.js';

// Mock the project service to test auth and API boundary without a real database
vi.mock('./services/project.service.js', () => ({
  listProjectsByOwner: vi.fn(),
  createProject: vi.fn(),
  getProjectById: vi.fn(),
  updateProjectState: vi.fn(),
  getProjectSnapshots: vi.fn()
}));

describe('Project API Authentication and Authorization', () => {
  const validToken = 'Bearer mock-valid-token';
  const invalidToken = 'Bearer invalid-token';

  it('GET /api/v1/projects without auth should return 401', async () => {
    const res = await request(app).get('/api/v1/projects');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('GET /api/v1/projects with invalid token should return 401', async () => {
    const res = await request(app).get('/api/v1/projects').set('Authorization', invalidToken);
    expect(res.status).toBe(401);
  });

  it('GET /api/v1/projects with valid mock token should return 200', async () => {
    vi.mocked(projectService.listProjectsByOwner).mockResolvedValueOnce([]);
    const res = await request(app).get('/api/v1/projects').set('Authorization', validToken);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(projectService.listProjectsByOwner).toHaveBeenCalledWith('test-user-123');
  });

  it('POST /api/v1/projects without auth should return 401', async () => {
    const res = await request(app).post('/api/v1/projects').send({
      name: 'Test',
      type: 'AUTOMATION',
      state: { version: 1, metadata: { name: 'Test' }, pages: [], screens: [], workflows: [], dataModels: [], settings: {} }
    });
    expect(res.status).toBe(401);
  });

  it('POST /api/v1/projects with invalid body should return 400', async () => {
    const res = await request(app).post('/api/v1/projects').set('Authorization', validToken).send({
      name: 'Test'
      // missing type and state
    });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('GET /api/v1/projects/:id for non-existent or unauthorized project should return 404', async () => {
    vi.mocked(projectService.getProjectById).mockResolvedValueOnce(null);
    const res = await request(app).get('/api/v1/projects/proj-123').set('Authorization', validToken);
    
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('PROJECT_NOT_FOUND');
    expect(res.body.error).not.toHaveProperty('stack');
  });

  it('GET /api/v1/projects/:id for authorized project should return 200', async () => {
    vi.mocked(projectService.getProjectById).mockResolvedValueOnce({ id: 'proj-123', ownerId: 'test-user-123' } as any);
    const res = await request(app).get('/api/v1/projects/proj-123').set('Authorization', validToken);
    
    expect(res.status).toBe(200);
    expect(projectService.getProjectById).toHaveBeenCalledWith('test-user-123', 'proj-123');
  });

  it('PATCH /api/v1/projects/:id/state should validate ownership', async () => {
    vi.mocked(projectService.updateProjectState).mockResolvedValueOnce(null); // Simulated unauthorized/not found
    
    const validState = { version: 1, metadata: { name: 't' }, pages: [], screens: [], workflows: [], dataModels: [], settings: {} };
    const res = await request(app).patch('/api/v1/projects/proj-123/state')
      .set('Authorization', validToken)
      .send({ state: validState });
      
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('PROJECT_NOT_FOUND');
    expect(projectService.updateProjectState).toHaveBeenCalledWith('test-user-123', 'proj-123', validState, undefined);
  });
});
