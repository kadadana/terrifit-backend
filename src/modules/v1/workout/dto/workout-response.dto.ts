import { Expose } from 'class-transformer';

export class WorkoutResponseDto {
  @Expose()
  id: string;

  @Expose()
  programId: string;

  @Expose()
  exerciseId: string;

  @Expose()
  set: number;

  @Expose()
  rep: number;

  @Expose()
  duration: number;

  @Expose()
  weight: number;

  @Expose()
  rest: number;

  @Expose()
  sortOrder: number;

  constructor(partial: Partial<WorkoutResponseDto>) {
    Object.assign(this, partial);
  }
}