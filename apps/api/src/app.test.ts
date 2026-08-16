import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app.js';

describe('API Health and Security Tests', () => {
  it('GET /api/health should return 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.service).toBe('saasx-api');
    expect(res.body).not.toHaveProperty('GEMINI_API_KEY');
  });

  it('POST /api/generate-workflow with empty body should return 400 validation error', async () => {
    const res = await request(app).post('/api/generate-workflow').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('POST /api/generate-workflow with short prompt should return 400', async () => {
    const res = await request(app).post('/api/generate-workflow').send({ promptAr: '123' });
    expect(res.status).toBe(400);
  });

  it('POST /api/generate-workflow with extremely long prompt should return 400', async () => {
    const longPrompt = 'a'.repeat(2000);
    const res = await request(app).post('/api/generate-workflow').send({ promptAr: longPrompt });
    expect(res.status).toBe(400);
  });

  it('POST /api/zaincash/pay with invalid amount should return 400', async () => {
    const res = await request(app).post('/api/zaincash/pay').send({ amountIqd: 10, phone: '07700000000' });
    expect(res.status).toBe(400);
  });

  it('GET /api/unknown-route should return 404 AppError', async () => {
    const res = await request(app).get('/api/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
    expect(res.body.error).not.toHaveProperty('stack');
  });
  
  it('Should include CORS headers', async () => {
    const res = await request(app).options('/api/health').set('Origin', 'http://localhost:3000');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });
});
