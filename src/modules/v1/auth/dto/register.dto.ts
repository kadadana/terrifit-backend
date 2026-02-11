import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'You need to provide a valid email address!' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long!' })
  password: string;

  @IsString()
  fullName: string;
}