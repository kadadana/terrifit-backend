import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { WorkoutModule } from './workout/workout.module';
import { ProgramModule } from './program/program.module';

@Module({
  imports:
    [
      AuthModule,
      UsersModule,
      WorkoutModule,
      ProgramModule,
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
            }
          ]
        }
      ])
    ],
  exports: [AuthModule, UsersModule],
})
export class V1Module { }