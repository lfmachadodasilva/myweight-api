/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { RecordEntity } from '../../../entities/record';
import { currentUser } from '../../../helpers/auth';
import { GetAllRecordsDto } from './dto';

export class GetAllRecordsCommand {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = await currentUser(request);

    try {
      const repository = getRepository(RecordEntity);
      const recordsEntity = await repository.find({ userId: user.uid });

      const records = recordsEntity.map(r => {
        return {
          id: r.id,
          weight: r.weight,
          date: r.date
        } as GetAllRecordsDto;
      });

      return response.json(records);
    } catch (e) {
      return response.status(400).json({
        message: e.message || 'Unexpected error.'
      });
    }
  }
}
