import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOne({
      select: ['id', 'email', 'fullName', 'password', 'role'],
      where: { email: dto.email }
    });

    if (!user) throw new ConflictException('Invalid email or password!');
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new ConflictException('Invalid email or password!');

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      message: 'Login successful!',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
