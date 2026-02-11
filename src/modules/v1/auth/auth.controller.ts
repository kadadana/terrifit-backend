import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  async register(@Body(new ValidationPipe()) dto: RegisterDto) {
    return this.authService.register(dto);
  }
}