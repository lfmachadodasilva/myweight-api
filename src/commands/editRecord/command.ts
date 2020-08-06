/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { RecordEntity } from '../../entities/record';
import { EditRecordsDto } from './dto';

export class EditRecordsCommand {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id as string);

    if (isNaN(id)) {
      return response.status(400).send('Something went wrong!');
    }

    const dto = request.body as EditRecordsDto;

    try {
      const repo = getRepository(RecordEntity);
      const entity = await repo.findOne({ id: id });

      if (entity === undefined) {
        return response.status(400).send('Something went wrong!');
      }

      entity.weight = dto.weight;
      entity.date = dto.date;

      entity.save();

      return response.json().status(200);
    } catch (e) {
      return response.status(400).json({
        message: e.message || 'Unexpected error.'
      });
    }
  }
}
