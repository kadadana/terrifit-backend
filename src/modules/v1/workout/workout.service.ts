import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { Workout } from "./entities/workout.entity";
import { CreateWorkoutDto } from "./dto/create-workout.dto";
import { UpdateWorkoutDto } from "./dto/update-workout.dto";
import { plainToInstance } from "class-transformer";
import { WorkoutResponseDto } from "./dto/workout-response.dto";
import { UUID } from "crypto";
import { isUUID, IsUUID } from "class-validator";

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
    ) { }

    async createWorkout(dto: CreateWorkoutDto) {
        const workout = this.workoutRepository.create(dto);

        if (dto.id) {
            const existingWorkout = await this.workoutRepository.findOne({
                where: {
                    id: dto.id,
                }
            });
            if (existingWorkout) {
                throw new ConflictException('Workout with the same id already exists!');
            }

            if (dto.sortOrder) {
                const existingSortOrder = await this.workoutRepository.findOne({
                    where: {
                        programId: dto.programId,
                        sortOrder: dto.sortOrder
                    }
                });
                if (existingSortOrder) {
                    throw new ConflictException('Workout with the same sort order already exists!');
                }
            }
        }
        await this.workoutRepository.save(workout);
        return { message: 'Workout created successfully!' };

    }

    async updateWorkout(id: string, dto: UpdateWorkoutDto) {

        const updateData: any = { ...dto };

        await this.workoutRepository.update(id, updateData)
        return { message: 'Workout updated successfully!' };
    }

    async getWorkoutById(id: string): Promise<Array<WorkoutResponseDto>> {
        if (!isUUID(id, '4')) {
            throw new BadRequestException('Invalid workout ID format!');
        }
        const user = await this.workoutRepository.find({
            where:
                { id: id }
        });

        if (!user || user.length === 0) {
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