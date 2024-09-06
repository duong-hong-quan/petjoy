import { Module } from '@nestjs/common';
import { PaymentPackageService } from './payment-package.service';
import { PaymentPackageController } from './payment-package.controller';

@Module({
  controllers: [PaymentPackageController],
  providers: [PaymentPackageService],
})
export class PaymentPackageModule {}
