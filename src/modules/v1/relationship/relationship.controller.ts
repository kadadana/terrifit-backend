import {
    Controller,
    Body,
    Patch,
    Param,
    Get,
    Post,
    Delete,
    ConflictException,
    MethodNotAllowedException
} from '@nestjs/common'; import { RelationshipService } from "./relationship.service";
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from "@/common/guards/roles.guard";
import { AuthGuard } from "@/common/guards/auth.guard";
import { RolesDecorator } from "@/common/decorators/roles.decorator";
import { CreateRelationshipDto } from "./dto/create-relationship.dto";
import { Role } from "@/common/enums/role.enum";
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller()
export class RelationshipController {
    constructor(private readonly relationshipService: RelationshipService) { }

    @Post()
    @RolesDecorator(Role.ADMIN, Role.USER)
    async create(
        @CurrentUser() user: any,
        @Body() dto: CreateRelationshipDto) {

        dto.senderId = user.sub;
        await this.relationshipService.createRelationship(dto);
        return { message: 'Relationship created successfully!' };
    }

    @Patch(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() dto: UpdateRelationshipDto) {
        if (user.role !== Role.ADMIN) {
            const relationship = await this.relationshipService.getRelationshipById(id);
            if (relationship.senderId !== user.sub && relationship.receiverId !== user.sub) {
                throw new MethodNotAllowedException('You can only update your relationships!');
            } else {
                return this.relationshipService.updateRelationship(id, dto);

            }
        }
    }

    @Get()
    @RolesDecorator(Role.ADMIN)
    async getAll() {
        return this.relationshipService.getAllRelationships();
    }

    @Get(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async getById(@CurrentUser() user: any, @Param('id') id: string) {
        if (user.role === Role.ADMIN) {
            return this.relationshipService.getRelationshipById(id);
        } else {
            return this.relationshipService.getRelationshipByIdAndUserId(id, user.sub);
        }
    }

    @Delete(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async delete(@CurrentUser() user: any, @Param('id') id: string) {
        if (user.role === Role.ADMIN) {
            return this.relationshipService.deleteRelationship(id);
        } else {
            return this.relationshipService.deleteRelationshipByIdAndUserId(id, user.sub);
        }
    }

}