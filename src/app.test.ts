import supertest from 'supertest';
import app from './app';

describe('Just test', () => {
  test('it should be ok', () => {
    const user = 'My Name';
    expect(user).toEqual('My Name');
  });

  test('run server', async () => {
    const result = await supertest(app).get('/process');
    expect(result.status).toBe(200);
  });
});
