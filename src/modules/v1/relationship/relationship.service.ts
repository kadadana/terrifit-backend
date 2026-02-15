import { Relationship } from "./entities/relationship.entity";
import { ConflictException, Injectable, MethodNotAllowedException } from "@nestjs/common";
import { CreateRelationshipDto } from "./dto/create-relationship.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { UpdateRelationshipDto } from "./dto/update-relationship.dto";
import { RelationshipResponseDto } from "./dto/relationship-response.dto";

@Injectable()
export class RelationshipService {
    constructor(
        @InjectRepository(Relationship)
        private relationshipRepository: Repository<Relationship>,
    ) { }

    async createRelationship(relDto: CreateRelationshipDto) {
        if(relDto.senderId === relDto.receiverId){
             throw new MethodNotAllowedException('You cannot follow or block yourself!');
        }


        const isBlocked = await this.relationshipRepository.findOne({
            where: [
                {
                    receiverId: relDto.senderId,
                    senderId: relDto.receiverId,
                    status: 'blocked'
                },
            ]
        });
        if (isBlocked) {
            throw new ConflictException('You are blocked by this user!');
        }

        const existingRelationship = await this.relationshipRepository.findOne({
            where: [
                {
                    senderId: relDto.senderId,
                    receiverId: relDto.receiverId,
                    status: relDto.status
                },
            ]
        });

        if (existingRelationship) {
            if (existingRelationship.status === "followed") {
                throw new ConflictException('You already followed this user!');
            }
            if (existingRelationship.status === "blocked") {
                throw new ConflictException('You blocked this user!');
            }
        }

        const relationshipInstance =
            this.relationshipRepository.create(relDto);
        const savedRelationship =
            await this.relationshipRepository.save(relationshipInstance);

        return plainToInstance(CreateRelationshipDto, savedRelationship, {
            excludeExtraneousValues: true,
        });
    }

    async updateRelationship(id: string, dto: UpdateRelationshipDto) {

        if (await this.relationshipRepository.findOne({ where: { id: id } }) === null) {
            throw new ConflictException('Relationship not found!');
        }

        await this.relationshipRepository.update(id, dto)
        return { message: 'Relationship updated successfully!' };
    }

    async getAllRelationships(): Promise<Array<RelationshipResponseDto>> {
        const relationships = await this.relationshipRepository.find();
        return relationships.map(relationship =>
            plainToInstance(RelationshipResponseDto, relationship, {
                excludeExtraneousValues: true
            }));
    }
    
    async getRelationshipById(id: string): Promise<RelationshipResponseDto> {
        const relationship = await this.relationshipRepository.findOne({
            where:
                { id: id }
        });
        return plainToInstance(RelationshipResponseDto, relationship, {
            excludeExtraneousValues: true,
        });
    }

    async getRelationshipByIdAndUserId(id: string, userId: string):
        Promise<RelationshipResponseDto> {
        const relationship = await this.relationshipRepository.findOne({
            where: [
                { id: id, senderId: userId },
                { id: id, receiverId: userId }
            ]
        });
        return plainToInstance(RelationshipResponseDto, relationship, {
            excludeExtraneousValues: true,
        });
    }

    async deleteRelationship(id: string) {
        await this.relationshipRepository.delete(id);
        return { message: 'Relationship deleted successfully!' };
    }

    async deleteRelationshipByIdAndUserId(id: string, userId: string) {
        await this.relationshipRepository.delete([
            { id: id, senderId: userId },
        ]);
        return { message: 'Relationship deleted successfully!' };
    }
}