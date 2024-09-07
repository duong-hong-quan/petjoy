import { Module } from "@nestjs/common";
import { PetTypeService } from "./pet-type.service";
import { PetTypeController } from "./pet-type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetType } from "./entities/pet-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PetType])],
  controllers: [PetTypeController],
  providers: [PetTypeService],
})
export class PetTypeModule {}
