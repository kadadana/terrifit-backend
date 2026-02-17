import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { WorkoutModule } from './workout/workout.module';
import { ProgramModule } from './program/program.module';
import { ExerciseModule } from './exercise/exercise.module';
import { RelationshipModule } from './relationship/relationship.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports:
    [
      AuthModule,
      UsersModule,
      WorkoutModule,
      ProgramModule,
      ExerciseModule,
      RelationshipModule,
      ProfileModule,
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
            },
            {
              path: 'profiles',
              module: ProfileModule,
            }
          ]
        }
      ])
    ],
})
export class V1Module { }