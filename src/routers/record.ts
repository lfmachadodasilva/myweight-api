import { Router } from 'express';

import { getAllRecordsCommand } from '../commands/record/getAll';
import { addRecordsCommand } from '../commands/record/add';
import { editRecordsCommand } from '../commands/record/edit';
import { deleteRecordsCommand } from '../commands/record/delete';
import { checkIfAuthenticated } from '../helpers/auth';

const router = Router();

router.get('/record', checkIfAuthenticated, (request, response) => {
  return getAllRecordsCommand.handle(request, response);
});

router.post('/record', checkIfAuthenticated, (request, response) => {
  return addRecordsCommand.handle(request, response);
});

router.put('/record/:id', checkIfAuthenticated, (request, response) => {
  return editRecordsCommand.handle(request, response);
});

router.delete('/record/:id', checkIfAuthenticated, (request, response) => {
  return deleteRecordsCommand.handle(request, response);
});

export const recordRouter = router;
