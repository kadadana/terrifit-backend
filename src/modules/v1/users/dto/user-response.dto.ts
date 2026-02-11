import { Expose, Exclude } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  password?: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}