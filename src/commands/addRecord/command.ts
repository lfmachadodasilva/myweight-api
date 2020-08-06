/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { RecordEntity } from '../../entities/record';
import { AddRecordsDto } from './dto';

export class AddRecordsCommand {
  async handle(request: Request, response: Response): Promise<Response> {
    const dto = request.body as AddRecordsDto;

    try {
      const repository = getRepository(RecordEntity);
      const result = await repository.insert({ weight: Number(dto.weight), date: new Date(dto.date) } as RecordEntity);
      return response.json(result.identifiers).status(201);
    } catch (e) {
      return response.status(400).json({
        message: e.message || 'Unexpected error.'
      });
    }
  }
}
