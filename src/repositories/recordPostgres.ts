/* eslint-disable no-unused-vars */
import { IRecordRepository } from './record';
import { RecordEntity } from 'src/entities/record';

export class RecordRepositoryPostgres implements IRecordRepository {
  getAll(): RecordEntity[] {
    throw new Error('Method not implemented.');
  }

  add(entity: RecordEntity): RecordEntity {
    throw new Error('Method not implemented.');
  }

  update(entity: RecordEntity): RecordEntity {
    throw new Error('Method not implemented.');
  }

  delete(id: number): boolean {
    throw new Error('Method not implemented.');
  }
}
