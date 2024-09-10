import { Module } from "@nestjs/common";
import { PetService } from "./pet.service";
import { PetController } from "./pet.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pet } from "./entities/pet.entity";
import { User } from "../user/entities/user.entity";
import { Like } from "../like/entities/like.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Pet, User, Like])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
