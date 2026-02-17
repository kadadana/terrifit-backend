import { Expose } from "class-transformer";

export class ProfileResponseDto{

    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    bio?: string;
    
    @Expose()
    avatarUrl?: string;

    @Expose()
    birthDate: string;

    @Expose()
    height: number;

    @Expose()
    weight: number;

    @Expose()
    gender: string;
    
}