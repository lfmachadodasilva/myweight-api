import { Router } from 'express';
import { getAllRecordsCommand } from '../commands/getAllRecords';
import { addRecordsCommand } from '../commands/addRecord';
import { editRecordsCommand } from '../commands/editRecord';
import { deleteRecordsCommand } from '../commands/deleteRecord';

const router = Router();

router.get('/record', (request, response) => {
  return getAllRecordsCommand.handle(request, response);
});

router.post('/record', (request, response) => {
  return addRecordsCommand.handle(request, response);
});

router.put('/record/:id', (request, response) => {
  return editRecordsCommand.handle(request, response);
});

router.delete('/record/:id', (request, response) => {
  return deleteRecordsCommand.handle(request, response);
});

export const recordRouter = router;
