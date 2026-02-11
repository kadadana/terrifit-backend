import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {    
    @IsOptional()
    @IsEmail({}, { message: 'You need to provide a valid email address!' })
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long!' })
    password?: string;

    @IsOptional()
    @IsString()
    fullName?: string;
}