import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('relationships')
@Unique(['senderId', 'receiverId'])
export class Relationship {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    senderId: string;

    @Column({ type: 'uuid' })
    receiverId: string;

    @Column({
        type: 'enum',
        enum: ['followed', 'blocked'],
        default: 'followed'
    })
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}