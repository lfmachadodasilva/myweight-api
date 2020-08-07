/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { RecordEntity } from '../../../entities/record';
import { currentUser } from '../../../helpers/auth';

export class DeleteRecordsCommand {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = await currentUser(request);
    const id = Number(request.params.id as string);

    if (isNaN(id)) {
      return response.status(500).send('Something went wrong!');
    }
    try {
      const repo = getRepository(RecordEntity);
      const entity = await repo.findOne({ id: id, userId: user.uid });

      if (entity === undefined) {
        return response.status(400).send('Something went wrong!');
      }

      entity.remove();
      return response.json().status(200);
    } catch (e) {
      return response.status(400).json({
        message: e.message || 'Unexpected error.'
      });
    }
  }
}
