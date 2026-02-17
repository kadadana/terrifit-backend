import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Program } from "./entities/program.entity";
import { CreateProgramDto } from "./dto/create-program.dto";
import { UpdateProgramDto } from "./dto/update-program.dto";
import { plainToInstance } from "class-transformer";
import { ProgramResponseDto } from "./dto/program-response.dto";
import { isUUID } from "class-validator";

@Injectable()
export class ProgramService {
    constructor(
        @InjectRepository(Program)
        private programRepository: Repository<Program>,
    ) { }

    async createProgram(currentUser: any, dto: CreateProgramDto) {
        const program = this.programRepository.create(
            { ...dto, ownerId: currentUser.sub });


        if (program.workouts) {
            program.workouts = program.workouts.map(workout => ({
                ...workout,
                program: program
            }));
        }
        const savedProgram = await this.programRepository.save(program);
        return plainToInstance(ProgramResponseDto, savedProgram, {
            excludeExtraneousValues: true,
        });
    }

    async updateProgram(id: string, dto: UpdateProgramDto) {
        const updateData: any = { ...dto };

        await this.programRepository.update(
            { id: id },
            updateData)
        return { message: 'Program updated successfully!' };
    }

    async getProgramById(id: string): Promise<ProgramResponseDto> {
        if (!isUUID(id, '4')) {
            throw new BadRequestException('Invalid program ID format!');
        }
        const program = await this.programRepository.findOne(
            { where: { id: id } });

        if (!program) {
            throw new NotFoundException('Program not found!');
        }

        return plainToInstance(ProgramResponseDto, program, {
            excludeExtraneousValues: true,
        });
    }

    async getProgramByIdForUser(currentUser: any, id: string): Promise<ProgramResponseDto> {

        if (!isUUID(id, '4')) {
            throw new BadRequestException('Invalid program ID format!');
        }

        const program = await this.programRepository.findOne({
            where: [
                { id: id, ownerId: currentUser.sub },
                { id: id, isPublic: true }
            ]
        });

        if (!program) {
            throw new NotFoundException('Program not found!');
        }

        return plainToInstance(ProgramResponseDto, program, {
            excludeExtraneousValues: true,
        });
    }

    async getAllPrograms(): Promise<Array<ProgramResponseDto>> {
        const programs = await this.programRepository.find();
        return programs.map(program =>
            plainToInstance(ProgramResponseDto, program, {
                excludeExtraneousValues: true
            }));
    }

}