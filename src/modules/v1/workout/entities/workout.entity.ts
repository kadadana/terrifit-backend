import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Program } from '../../program/entities/program.entity';

@Entity('workouts')
export class Workout {

  @ManyToOne(() => Program, program => program.workouts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'programId' })
  program: Program;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
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