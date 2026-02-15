import { Expose } from 'class-transformer';

export class RelationshipResponseDto {
    @Expose()
    id: string;

    @Expose()
    senderId: string;

    @Expose()
    receiverId: string;

    @Expose()
    status: string;

    @Expose()
    createdAt: Date;

    constructor(partial: Partial<RelationshipResponseDto>) {
        Object.assign(this, partial);
    }

}