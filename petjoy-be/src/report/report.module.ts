import { Module } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ReportController } from "./report.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Payment } from "../payment/entities/payment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Payment])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
