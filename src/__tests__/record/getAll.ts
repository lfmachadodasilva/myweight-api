import supertest from 'supertest';
import { createConnection, getConnection } from 'typeorm';

import app from '../../app';

describe('Just test', () => {
  //
  beforeEach(() => {
    createConnection({
      type: 'postgres',
      database: ':memory:',
      dropSchema: true,
      entities: ['src/entities/**/*.ts'],
      synchronize: true,
      logging: false
    });
  });

  afterEach(() => {
    getConnection().close();
  });

  test('unauthorized', async () => {
    const result = await supertest(app).get('/record');
    expect(result.status).toBe(401);
  });
});
