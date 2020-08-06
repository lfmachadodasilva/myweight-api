// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { RecordEntity } from '../../entities/record';

export class GetAllRecordsCommand {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const repo = getRepository(RecordEntity);
      const records = await repo.find();

      return response.json({ records: records });
    } catch (e) {
      response.status(400).json({
        message: e.message || 'Unexpected error.'
      });
    }

    return response.status(200).send();
  }
}
