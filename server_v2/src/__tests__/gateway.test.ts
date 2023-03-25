import createServer from '../utils/server';
import supertest from 'supertest';

const app = createServer();

describe('gateway', () => {
  describe('get gateway route', () => {
    describe('given the gateway does not exist', () => {
      it('should return a 404', async () => {
        const serialNumber = '12345';
        await supertest(app).get(`/api/gateway/${serialNumber}`).expect(404);
      });
    });
  });
});
