import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { BanReportService } from "./ban-report.service";
import { BanReportController } from "./ban-report.controller";
import { BanReport } from "./entities/ban-report.entity";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BanReport, User])],
  controllers: [BanReportController],
  providers: [BanReportService],
})
export class BanReportModule {}
