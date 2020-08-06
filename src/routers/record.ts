import { Router } from 'express';
import { getAllRecordsCommand } from '../commands/getAllRecords';
import { addRecordsCommand } from '../commands/addRecord';

const router = Router();

router.get('/record', (request, response) => {
  return getAllRecordsCommand.handle(request, response);
});

router.post('/record', (request, response) => {
  return addRecordsCommand.handle(request, response);
});

router.put('/record', (request, response) => {
  // TODO edit
});

router.delete('/record', (request, response) => {
  // TODO delete
});

export const recordRouter = router;
