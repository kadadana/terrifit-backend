import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { WorkoutModule } from './workout/workout.module';
import { ProgramModule } from './program/program.module';
import { ExerciseModule } from './exercise/exercise.module';
import { RelationshipModule } from './relationship/relationship.module';

@Module({
  imports:
    [
      AuthModule,
      UsersModule,
      WorkoutModule,
      ProgramModule,
      ExerciseModule,
      RelationshipModule,
      RouterModule.register([
        {
          path: '',
          children: [
            {
              path: 'auth',
              module: AuthModule,
            },
            {
              path: 'users',
              module: UsersModule,
            },
            {
              path: 'workouts',
              module: WorkoutModule,
            },
            {
              path: 'programs',
              module: ProgramModule,
            },
            {
              path: 'exercises',
              module: ExerciseModule,
            },
            {
              path: 'relationships',
              module: RelationshipModule,
            }
          ]
        }
      ])
    ],
})
export class V1Module { }