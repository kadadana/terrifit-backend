import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum MuscleGroup {
    CHEST = 'chest',
    BACK = 'back',
    LEGS = 'legs',
    ARMS = 'arms',
    SHOULDERS = 'shoulders',
    CORE = 'core',
}
@Entity('exercises')
export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 100, nullable: true })
    category: string;
    
    @Column({ length: 100 })
    muscleGroup: string;

    @Column({ length: 100 })
    type: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    animation: string;

}