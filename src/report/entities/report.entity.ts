import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'freed_report' })
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column('timestamp with time zone')
  create_date: Date;
}
