import { Module } from "@nestjs/common";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/user/entities/user.entity";
import { Pet } from "@/pet/entities/pet.entity";
import { Like } from "./entities/like.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Like, Pet])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
