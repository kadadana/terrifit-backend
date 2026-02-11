import { Injectable, ConflictException, Module } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async register(dto: RegisterDto) {
    // Checking if a user with the same email already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: dto.email }
    });
    if (existingUser) throw new
      ConflictException('This email is already taken by another user!');

    // Hashing the password before saving the user
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    delete user.password;
    return user;
  }
}
