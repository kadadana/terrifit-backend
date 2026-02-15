import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExerciseDto {
    @IsString()
    @IsNotEmpty({ message: 'Exercise name cannot be empty!' })
    @MaxLength(255)
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Category should be specified!' })
    @MaxLength(100)
    category: string;

    @IsString()
    @IsNotEmpty({ message: 'Muscle group should be specified!' })
    @MaxLength(100)
    muscleGroup: string;

    @IsString()
    @IsNotEmpty({ message: 'Type should be specified!' })
    @MaxLength(100)
    type: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    animation?: string;
}