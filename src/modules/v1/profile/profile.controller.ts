import {
    Body,
    Controller,
    Get,
    MethodNotAllowedException,
    Param,
    Patch,
    Post,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@/common/guards/auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { ProfileService } from "./profile.service";
import { RolesDecorator } from "@/common/decorators/roles.decorator";
import { Role } from "@/common/enums/role.enum";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@UseGuards(AuthGuard, RolesGuard)
@Controller()
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Post()
    @RolesDecorator(Role.ADMIN, Role.USER)
    async create(@CurrentUser() currentUser: any, @Body() dto: CreateProfileDto) {
        if (currentUser.role === Role.ADMIN && dto.id) {
            dto.id = dto.id;
        } else {
            dto.id = currentUser.sub;
        }

        return this.profileService.createProfile(dto);
    }

    @Patch(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async update(
        @CurrentUser() currentUser: any,
        @Param('id') id: string,
        @Body() dto: UpdateProfileDto,
    ) {
        if (currentUser.role === Role.ADMIN) {
            dto.id = id;
            return this.profileService.updateProfile(dto);
        } else {
            if (currentUser.sub === id) {
                dto.id = currentUser.sub;
                return this.profileService.updateProfile(dto);
            } else {
                throw new MethodNotAllowedException('You are not authorized to update this profile!');
            }
        }

    }

    @Get()
    @RolesDecorator(Role.ADMIN)
    async getAllUsers() {
        return this.profileService.getAllProfiles();
    }

    @Get(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async getById(@Param('id') id: string) {
        return this.profileService.getProfileById(id);
    }
}