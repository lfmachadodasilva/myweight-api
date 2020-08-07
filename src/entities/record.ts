import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: number;

  @Column({ type: 'decimal' })
  weight?: number;

  @Column({ type: 'timestamp without time zone' })
  date?: Date;

  @Column({ type: 'text' })
  userId?: string;
}
