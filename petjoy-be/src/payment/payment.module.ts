import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { User } from "../user/entities/user.entity";
import { PaymentPackage } from "../payment-package/entities/payment-package.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, PaymentPackage])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
