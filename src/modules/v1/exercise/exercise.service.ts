import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exercise } from "./entities/exercise.entity";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";
import { CreateExerciseDto } from "./dto/create-exercise.dto";

@Injectable()
export class ExerciseService {
    constructor(
        @InjectRepository(Exercise)
        private exerciseRepository: Repository<Exercise>,
    ) { }

    async createExercise(dto: CreateExerciseDto) {
        const exercise = this.exerciseRepository.create(dto);
        await this.exerciseRepository.save(exercise);
        return { message: 'Exercise created successfully!' };

    }

    async updateExercise(id: string, dto: UpdateExerciseDto) {
        await this.exerciseRepository.update(
            { id: id },
            { ...dto }
        );
        return { message: 'Exercise updated successfully!' };
    }

    async getAllExercises() {
        return this.exerciseRepository.find();
    }

    async getExerciseById(id: string) {
        return this.exerciseRepository.findOne({ where: { id: id } });
    }
}
