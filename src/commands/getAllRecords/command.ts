/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { RecordEntity } from '../../entities/record';
import { GetAllRecordsDto } from './dto';

export class GetAllRecordsCommand {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const repository = getRepository(RecordEntity);
      const recordsEntity = await repository.find();

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
