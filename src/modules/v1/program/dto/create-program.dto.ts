import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateWorkoutDto } from '../../workout/dto/create-workout.dto';
import { Type } from 'class-transformer';

export class CreateProgramDto {

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateWorkoutDto)
    workouts: CreateWorkoutDto[];

}