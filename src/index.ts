import express from 'express';
import { createConnection } from 'typeorm';

import { checkIfAuthenticated, currentUser } from './helpers/auth';
import { recordRouter } from './routers/record';
import { getTypeOrmConfiguration } from './helpers/typeorm';

createConnection(getTypeOrmConfiguration())
  .then(connection => {
    // create tables if doesn't exist
    connection.synchronize();

    // Create Express server
    const app = express();

    // Define port to be used
    app.set('port', process.env.PORT || 3001);

    // Use json
    app.use(express.json());

    // Use routers
    app.use(recordRouter);

    app.get('/me', checkIfAuthenticated, async (request, response, next) => {
      const user = await currentUser(request);
      return response.json(user);
    });

    // TODO move/delete
    app.get('/process', async (request, response, next) => {
      return response
        .json({
          buildVersion: process.env.BUILD_VERSION,
          firebaseProject: process.env.FIREBASE_PROJECT,

          host: process.env.DATABASE_HOST,
          database: process.env.DATABASE_DATABASE,
          user: process.env.DATABASE_USER,
          env: process.env.NODE_ENV
        })
        .status(200);
    });

    /**
     * Start Express server.
     */
    app.listen(app.get('port'), () => {
      console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
      console.log('  Press CTRL-C to stop\n');
    });
  })
  .catch(error => console.log('TypeORM connection error: ', error));
