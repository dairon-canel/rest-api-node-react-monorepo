import { disconnectDB, initializeDB } from '../config';
import request from 'supertest';
import app from '../app';

describe('Sample API Test', () => {
  it('should return true', () => {
    expect(true).toBe(true);
  });

  /* it('should return 200 OK', async () => {
    const res = await request(app).get('/gateways');
    console.log(res.status);
    expect(res.status).toBe(200);
  }); */
});
