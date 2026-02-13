import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [AuthModule, UsersModule, WorkoutModule,
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
            path: 'workout',
            module: WorkoutModule,
          }
        ]
      }
    ])
  ],
  exports: [AuthModule, UsersModule],
})
export class V1Module { }