import {
    Controller,
    Body,
    Patch,
    Param,
    Get,
    Post
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService) { }

    @Post()
    async create(@Body() dto: CreateWorkoutDto) {
        return this.workoutService.createWorkout(dto);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateWorkoutDto
    ) {
        return this.workoutService.updateWorkout(id, dto);
    }

    @Get()
    async getAll() {
        return this.workoutService.getAllWorkouts();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.workoutService.getWorkoutById(id);
    }
}