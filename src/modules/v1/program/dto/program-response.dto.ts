import { Expose } from 'class-transformer';

export class ProgramResponseDto {

    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    description?: string;

    @Expose()
    ownerId: string;

    @Expose()
    createdAt: Date;
    
    @Expose()
    isPublic: boolean;
    
    constructor(partial: Partial<ProgramResponseDto>) {
        Object.assign(this, partial);
    }
}