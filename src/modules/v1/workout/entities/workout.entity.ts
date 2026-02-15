import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Program } from '../../program/entities/program.entity';

@Entity('workouts')
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

  @ManyToOne(() => Program, program => program.workouts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'programId' })
  program: Program;

}