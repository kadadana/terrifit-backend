import {
    Controller,
    Body,
    Patch,
    Param,
    Get,
    ForbiddenException
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Role } from '@/common/enums/role.enum';
import { RolesDecorator } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@Controller()
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Patch(':id')
    @RolesDecorator(Role.USER, Role.ADMIN)
    async update(
        @CurrentUser() currentUser: any,
        @Param('id') id: string,
        @Body() dto: UpdateUserDto
    ) {
        if (currentUser.role === Role.ADMIN) {
            return this.usersService.updateUser(id, dto);
        } else {
            if (currentUser.sub !== id) {
                throw new ForbiddenException('You can only update your own profile');
            }
        }
    }

    @Get()
    @RolesDecorator(Role.ADMIN)
    async getAll() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    @RolesDecorator(Role.USER, Role.ADMIN)
    async getById(
        @CurrentUser() currentUser: any,
        @Param('id') id: string) {
        if (currentUser.role === Role.ADMIN) {
            return this.usersService.getFullInfoById(id);
        } else {
            if (currentUser.sub === id) {
                return this.usersService.getFullInfoById(id);
            }else{
                return this.usersService.getById(id);
            }
        }
    }
}
