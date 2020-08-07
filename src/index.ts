import { createConnection } from 'typeorm';

import { getTypeOrmConfiguration } from './helpers/typeorm';
import app from './app';

createConnection(getTypeOrmConfiguration())
  .then(connection => {
    //
    // create tables if doesn't exist
    connection.synchronize();
    //
    /**
     * Start Express server.
     */
    app.listen(app.get('port'), () => {
      console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
      console.log('  Press CTRL-C to stop\n');
    });
    //
    //
  })
  .catch(error => console.log('TypeORM connection error: ', error));
