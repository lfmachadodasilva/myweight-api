// eslint-disable-next-line no-unused-vars
import { RecordEntity } from 'src/entities/record';

export interface IRecordRepository {
  getAll(): RecordEntity[];
  add(entity: RecordEntity): RecordEntity;
  update(entity: RecordEntity): RecordEntity;
  delete(id: number): boolean;
}
