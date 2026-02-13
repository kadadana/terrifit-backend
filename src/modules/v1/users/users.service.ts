import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update.user.dto";
import { plainToInstance } from "class-transformer";
import { UserResponseDto } from "./dto/user-response.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async updateUser(id: string, dto: UpdateUserDto) {

        const updateData: any = { ...dto };

        if (dto.email) {
            // Checking if a user with the same email already exists
            const emailExists = await this.usersRepository.findOne(
                {
                    where:
                    {
                        email: dto.email,
                        id: Not(id)
                    }
                });
            if (emailExists) throw new
                ConflictException('This email is already taken by another user!');
        }

        if (dto.password) {
            // Hashing the password before saving it to the database
            updateData.password = await bcrypt.hash(dto.password, 10);
        } else {
            delete updateData.password;
        }


        await this.usersRepository.update(id, updateData)
        return { message: 'User updated successfully!' };
    }

    async getById(id: string): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found!');
        }

        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }
    async getAllUsers(): Promise<Array<UserResponseDto>> {
        const users = await this.usersRepository.find();
        return users.map(user => plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true
        }));
    }


}