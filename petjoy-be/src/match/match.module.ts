import { Module } from "@nestjs/common";
import { MatchService } from "./match.service";
import { MatchController } from "./match.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/user/entities/user.entity";
import { Match } from "./entities/match.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Match])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
