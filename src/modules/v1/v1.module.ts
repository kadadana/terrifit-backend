import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [AuthModule, UsersModule,
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
          }
        ]
      }
    ])
  ],
  exports: [AuthModule, UsersModule],
})
export class V1Module { }