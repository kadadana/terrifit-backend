import { Expose } from 'class-transformer';

export class ExerciseResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    category: string;

    @Expose()
    muscleGroup: string;

    @Expose()
    type: string;

    @Expose()
    description: string;

    @Expose()
    animation: string;
}