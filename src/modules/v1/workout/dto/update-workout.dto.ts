import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateWorkoutDto } from './create-workout.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateWorkoutDto extends PartialType(
    OmitType(CreateWorkoutDto, ['id', 'programId'] as const)) {

    @IsNumber()
    @IsNotEmpty({ message: 'Sort order is required!' })
    sortOrder: number;
}