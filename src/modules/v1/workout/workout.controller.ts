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
import { AuthGuard } from '@/common/guards/auth.guard';
import { Role } from '@/common/enums/role.enum';
import { RolesGuard } from '@/common/guards/roles.guard';
import { RolesDecorator } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ProgramService } from '../program/program.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller()
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService,
        private readonly programService: ProgramService) { }

    @Post()
    @RolesDecorator(Role.ADMIN, Role.USER)
    async create(@Body() dto: CreateWorkoutDto) {
        return this.workoutService.createWorkout(dto);
    }

    @Patch(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async update(
        @CurrentUser() currentUser: any,
        @Param('id') id: string,
        @Body() dto: UpdateWorkoutDto
    ) {
        if (currentUser.role === Role.ADMIN) {
            return this.workoutService.updateWorkout(id, dto);
        } else {
            const workout = await this.workoutService.getWorkoutById(id);
            const program = await this.programService.getProgramById(workout.programId);
            if (program.ownerId !== currentUser.id) {
                return { message: 'You are not authorized to update this workout!' };
            } else {
                return this.workoutService.updateWorkout(id, dto);
            }
        }
    }

    @Get()
    @RolesDecorator(Role.ADMIN)
    async getAll() {
        return this.workoutService.getAllWorkouts();
    }

    @Get(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async getById(@CurrentUser() currentUser: any, @Param('id') id: string) {
        if (currentUser.role === Role.ADMIN) {
            return this.workoutService.getWorkoutById(id);
        } else {
            const workout = await this.workoutService.getWorkoutById(id);
            const program = await this.programService.getProgramById(workout.programId);
            if (program.ownerId !== currentUser.id) {
                return { message: 'You are not authorized to view this workout!' };
            } else {
                return this.workoutService.getWorkoutById(id);
            }
        }
    }
}