import { Module } from "@nestjs/common";
import { PaymentPackageService } from "./payment-package.service";
import { PaymentPackageController } from "./payment-package.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentPackage } from "./entities/payment-package.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPackage])],
  controllers: [PaymentPackageController],
  providers: [PaymentPackageService],
})
export class PaymentPackageModule {}
