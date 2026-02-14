import {
    Controller,
    Body,
    Patch,
    Param,
    Get,
    Post,
    ForbiddenException
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Role } from '@/common/enums/role.enum';
import { RolesGuard } from '@/common/guards/roles.guard';
import { RolesDecorator } from '@/common/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller()
export class ProgramController {
    constructor(private readonly programService: ProgramService) { }

    @Post()
    @RolesDecorator(Role.ADMIN, Role.USER)
    async create(@CurrentUser() currentUser: any, @Body() dto: CreateProgramDto) {
        if (currentUser.role === Role.ADMIN) {
            return this.programService.createProgram(currentUser, dto);
        } else {
            if (dto.ownerId && dto.ownerId !== currentUser.sub) {
                throw new ForbiddenException('You cannot create a program for another user!');
            } else {
                return this.programService.createProgram(currentUser, dto);
            }
        }
    }

    @Patch(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async update(
        @CurrentUser() currentUser: any,
        @Param('id') id: string,
        @Body() dto: UpdateProgramDto,
    ) {
        if (currentUser.role === Role.ADMIN) {
            return this.programService.updateProgram(id, dto);
        } else {
            const program = await this.programService.getProgramByIdForUser(currentUser, id);
            if (program.ownerId !== currentUser.sub) {
                throw new ForbiddenException('You are not authorized to update this program!');
            }
            return this.programService.updateProgram(id, dto);
        }
    }

    @Get()
    @RolesDecorator(Role.ADMIN)
    async getAllByOneUser() {
        return this.programService.getAllPrograms();
    }

    @Get(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async getById(@CurrentUser() currentUser: any, @Param('id') id: string) {
        if (currentUser.role === Role.ADMIN) {
            return this.programService.getProgramById(id);
        } else {
            return this.programService.getProgramByIdForUser(currentUser, id);
        }
    }
}