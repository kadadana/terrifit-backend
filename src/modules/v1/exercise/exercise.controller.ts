import { RolesDecorator } from "@/common/decorators/roles.decorator";
import { Get, Patch, UseGuards } from "@nestjs/common";
import { Controller, Body, Post, Param } from "@nestjs/common";
import { ExerciseService } from "./exercise.service";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { AuthGuard } from "@/common/guards/auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { Role } from "@/common/enums/role.enum";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";

@UseGuards(AuthGuard, RolesGuard)
@Controller()
export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) { }

    @Post()
    @RolesDecorator(Role.ADMIN)
    async create(@Body() dto: CreateExerciseDto) {
        return this.exerciseService.createExercise(dto);
    }

    @Patch(':id')
    @RolesDecorator(Role.ADMIN)
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateExerciseDto,
    ) {
        return this.exerciseService.updateExercise(id, dto);
    }

    @Get()
    @RolesDecorator(Role.ADMIN, Role.USER)
    async getAll() {
        return this.exerciseService.getAllExercises();
    }

    @Get(':id')
    @RolesDecorator(Role.ADMIN, Role.USER)
    async getById(id: string) {
        return this.exerciseService.getExerciseById(id);
    }
}