import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Relationship } from "./entities/relationship.entity";
import { RelationshipController } from "./relationship.controller";
import { RelationshipService } from "./relationship.service";

@Module({
    imports: [TypeOrmModule.forFeature([Relationship])],
    controllers: [RelationshipController],
    providers: [RelationshipService],
    exports: [TypeOrmModule.forFeature([Relationship])],
})
export class RelationshipModule { }
