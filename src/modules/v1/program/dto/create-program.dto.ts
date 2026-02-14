import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProgramDto {

    @IsUUID('4', { message: 'Invalid program ID format!' })
    @IsNotEmpty({ message: 'Program ID is required!' })
    id: string;

    @IsString()
    @IsNotEmpty({ message: 'Program name is required!' })
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    ownerId?: string;

    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;

}