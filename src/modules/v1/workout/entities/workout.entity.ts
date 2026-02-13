import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workout')
export class Workout {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  programId: string;

  @Column()
  exerciseId: string;

  @Column()
  set: number;

  @Column({ nullable: true })
  rep?: number;

  @Column({ nullable: true })
  duration?: number;

  @Column({ nullable: true })
  weight?: number;

  @Column({ nullable: true })
  rest?: number;

  @Column()
  sortOrder: number;

}