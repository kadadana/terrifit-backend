import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Gender } from "@/common/enums/gender.enum";

@Entity('profiles')
export class Profile {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    avatarUrl?: string;

    @Column({ type: 'enum', enum: Gender , nullable: true})
    gender: Gender;

    @Column({ nullable: true })
    birthDate?: Date;

    @Column({ nullable: true })
    height?: number;

    @Column({ nullable: true })
    weight?: number;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    user: User;
}