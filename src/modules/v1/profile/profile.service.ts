import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { Repository } from "typeorm";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { plainToInstance } from "class-transformer";
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { isUUID } from "class-validator";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) { }

    async createProfile(dto: CreateProfileDto) {
        const profile = this.profileRepository.create(
            { ...dto });

        const savedProfile = await this.profileRepository.save(profile);
        return plainToInstance(ProfileResponseDto, savedProfile, {
            excludeExtraneousValues: true,
        });
    }

    async updateProfile(dto: UpdateProfileDto) {
        await this.profileRepository.update(
            { id: dto.id },
            dto)
        return { message: 'Program updated successfully!' };
    }

    async getProfileById(id: string): Promise<ProfileResponseDto> {
        if (!isUUID(id, '4')) {
            throw new BadRequestException('Invalid profile ID format!');
        }
        const profile = await this.profileRepository.findOne(
            { where: { id: id } });
        if (!profile) {
            throw new NotFoundException('Profile not found!');
        }

        return plainToInstance(ProfileResponseDto, profile, {
            excludeExtraneousValues: true,
        })
    }

    async getAllProfiles(): Promise<Array<ProfileResponseDto>> {
        const profiles = await this.profileRepository.find();
        return profiles.map(profile =>
            plainToInstance(ProfileResponseDto, profile, {
                excludeExtraneousValues: true
            }));
    }
}