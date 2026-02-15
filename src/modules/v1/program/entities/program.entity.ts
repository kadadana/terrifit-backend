import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Workout } from '../../workout/entities/workout.entity';

@Entity('programs')
export class Program {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    ownerId: string;

    @Column({ default: false })
    isPublic: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Workout, workout => workout.programId, { cascade: true })
    workouts: Workout[];
    
}