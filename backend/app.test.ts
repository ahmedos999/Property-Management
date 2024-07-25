import request from 'supertest';
import app from './server';

describe('GET /api/lead', () => {
  it('Get leads endpoint test', async () => {
    const response = await request(app).get('/api/lead');
    expect(response.status).toBe(200);
  });
});

describe('GET /api/property', () => {
    it('Get properties endpoint test', async () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjllY2MyMTBlMTRmYmYzODMwOTYzOTkiLCJpYXQiOjE3MjE5MTI1NTAsImV4cCI6MTcyMjM0NDU1MH0.S84_vYA30Pndbs9AsUwPWrOJHvFBYZll4kjbvf61Xps';

      const response = await request(app).get('/api/property')
      .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });


  describe('POST  /api/user/login', () => {
    it('test user login', async () => {


      const response = await request(app).post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ username: 'testuser', password: 'ASDFqwer1234#' }))
      .expect('Content-Type', /json/);
      expect(response.status).toBe(200);
    });
  });
