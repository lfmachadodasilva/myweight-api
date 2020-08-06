/* eslint-disable no-unused-vars */
import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getTypeOrmConfiguration = (): ConnectionOptions => {
  dotenv.config();

  const username = process.env.DATABASE_USER || 'postgres';
  const password = process.env.DATABASE_PASSWORD || 'postgres';
  const host = process.env.DATABASE_HOST || 'localhost';
  const port = process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 5433;
  const database = process.env.DATABASE_DATABASE || 'myweight';

  return {
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [process.env.NODE_ENV === 'development' ? 'src/entities/**/*.ts' : 'entities/**/*.js'],
    migrations: [process.env.NODE_ENV === 'development' ? 'src/migration/**/*.ts' : 'migration/**/*.js'],
    subscribers: [process.env.NODE_ENV === 'development' ? 'src/subscriber/**/*.ts' : 'subscriber/**/*.js'],
    cli: {
      entitiesDir: 'entities',
      migrationsDir: 'migration',
      subscribersDir: 'subscriber'
    },
    // ssl: false
    ssl:
      process.env.NODE_ENV === 'development'
        ? false
        : {
            // https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database
            rejectUnauthorized: false
          }
  } as PostgresConnectionOptions;
};
