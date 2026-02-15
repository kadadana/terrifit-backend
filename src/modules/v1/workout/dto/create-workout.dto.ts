import { IsNumber, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateWorkoutDto {

    @IsString()
    @IsNotEmpty({ message: 'Program ID is required!' })
    programId?: string;

    @IsOptional()
    @IsString()
    exerciseId?: string;

    @IsOptional()
    @IsNumber()
    set?: number

    @IsNumber()
    @IsOptional()
    rep?: number;

    @IsNumber()
    @IsOptional()
    duration?: number;

    @IsNumber()
    @IsOptional()
    weight?: number;

    @IsNumber()
    @IsOptional()
    rest?: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Sort order is required!' })
    sortOrder: number;

}