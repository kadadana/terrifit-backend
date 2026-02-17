import { Gender } from "@/common/enums/gender.enum";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProfileDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty({message: 'Username is required!'})
    username: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    avatarUrl?: string;

    @IsDate()
    @IsOptional()
    birthDate?: Date;

    @IsNumber()
    @IsOptional()
    height?: number;

    @IsNumber()
    @IsOptional()
    weight?: number;

    
    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;


}