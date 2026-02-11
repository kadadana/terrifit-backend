import {
    Controller,
    Body,
    ValidationPipe,
    Patch,
    Param,
    Get
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body(new ValidationPipe()) dto: UpdateUserDto
    ) {
        return this.usersService.updateUser(id, dto);
    }

    @Get()
    async getAll() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.usersService.getById(id);
    }
}