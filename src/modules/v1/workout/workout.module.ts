import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { ProgramModule } from '../program/program.module';

@Module({
    imports: [TypeOrmModule.forFeature([Workout]), ProgramModule],
    controllers: [WorkoutController],
    providers: [WorkoutService],
    exports: [TypeOrmModule],
})
export class WorkoutModule { }