import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Workout } from "./entities/workout.entity";
import { CreateWorkoutDto } from "./dto/create-workout.dto";
import { UpdateWorkoutDto } from "./dto/update-workout.dto";
import { plainToInstance } from "class-transformer";
import { WorkoutResponseDto } from "./dto/workout-response.dto";
import { isUUID } from "class-validator";

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
    ) { }

    async createWorkout(dto: CreateWorkoutDto) {
        const workoutInstance = this.workoutRepository.create(dto);
        const savedWorkout = await this.workoutRepository.save(workoutInstance);

        return plainToInstance(WorkoutResponseDto, savedWorkout, {
            excludeExtraneousValues: true,
        });
    }

    async updateWorkout(id: string, dto: UpdateWorkoutDto) {

        const updateData: any = { ...dto };

        await this.workoutRepository.update(id, updateData)
        return { message: 'Workout updated successfully!' };
    }

    async getWorkoutById(id: string): Promise<WorkoutResponseDto> {
        if (!isUUID(id, '4')) {
            throw new BadRequestException('Invalid workout ID format!');
        }
        const user = await this.workoutRepository.findOne({
            where:
                { id: id }
        });

        if (!user) {
            throw new NotFoundException('Workout not found!');
        }

        return plainToInstance(WorkoutResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    async getAllWorkouts(): Promise<Array<WorkoutResponseDto>> {
        const users = await this.workoutRepository.find();
        return users.map(user => plainToInstance(WorkoutResponseDto, user, {
            excludeExtraneousValues: true
        }));
    }


}