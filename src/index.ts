import express from 'express';
import { createConnection } from 'typeorm';

import { checkIfAuthenticated, currentUser } from './helpers/auth';
import { recordRouter } from './routers/record';
import { getTypeOrmConfiguration } from './helpers/typeorm';
import { RecordEntity } from './entities/record';

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

    // TODO move/delete
    app.get('/record2', async (request, response, next) => {
      const repo = connection.getRepository(RecordEntity);
      const records = await repo.find();

      return response.json({ records: records });
    });

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

    // TODO move/delete
    app.post('/record2', async (request, response, next) => {
      const entity = new RecordEntity();
      entity.date = new Date();
      entity.weight = Number(request.body.weight as string) || 10;

      const repo = connection.getRepository(RecordEntity);
      const result = await repo.save(entity);

      return response.json({ records: result });
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

// // Create Express server
// const app = express();

// // Define port to be used
// app.set('port', process.env.PORT || 3001);

// // Use json
// app.use(express.json());

// // Use routers
// app.use(recordRouter);

// TODO move/delete
// app.get('/record2', async (request, response, next) => {
//    const connection = getConnection();
//    connection.

//   const repo = getRepository(RecordEntity);
//   const records = await repo.find();

//   return response.json({ records: records });
// });

// // TODO move/delete
// app.delete('/record2:id', async (request, response, next) => {
//   const id = Number(request.params.id as string);

//   if (isNaN(id)) {
//     return response.status(500).send('Something went wrong!');
//   }

//   const connection = getConnection();

//   const repo = connection.getRepository(RecordEntity);
//   const records = await repo.find({ id: id });
//   if (records.length > 0) {
//     records.forEach(x => x.remove());
//   }

//   return response.json({ records: records });
// });

// // TODO move/delete
// app.post('/record2', async (request, response, next) => {
//   const connection = getConnection();

//   const entity = new RecordEntity();
//   entity.date = new Date();
//   entity.weight = Number(request.body.weight as string) || 10;

//   const repo = connection.getRepository(RecordEntity);
//   const result = await repo.save(entity);

//   return response.json({ records: result });
// });

// // TODO move/delete
// app.put('/record2:id', async (request, response, next) => {
//   const id = Number(request.params.id as string);

//   if (isNaN(id)) {
//     return response.status(500).send('Something went wrong!');
//   }

//   const connection = getConnection();

//   const repo = connection.getRepository(RecordEntity);
//   const entity = await repo.findOne({ id: id });

//   if (entity === undefined) {
//     return response.status(500).send('Something went wrong!');
//   }

//   entity.weight = Number(request.body.weight as string) || 10;
//   entity.save();

//   return response.json({ records: entity });
// });

// app.get('/me', checkIfAuthenticated, async (request, response, next) => {
//   const user = await currentUser(request);
//   return response.json(user);
// });

// // TODO move/delete
// app.get('/process', async (request, response, next) => {
//   return response
//     .json({
//       buildVersion: process.env.BUILD_VERSION,
//       firebaseProject: process.env.FIREBASE_PROJECT,

//       host: process.env.DATABASE_HOST,
//       database: process.env.DATABASE_DATABASE,
//       user: process.env.DATABASE_USER,
//       env: process.env.NODE_ENV
//     })
//     .status(200);
// });

// export default app;
