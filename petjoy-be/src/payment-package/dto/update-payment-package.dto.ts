import { PartialType } from '@nestjs/swagger';
import { CreatePaymentPackageDto } from './create-payment-package.dto';

export class UpdatePaymentPackageDto extends PartialType(CreatePaymentPackageDto) {}
