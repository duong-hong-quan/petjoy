import { Injectable } from '@nestjs/common';
import { CreatePaymentPackageDto } from './dto/create-payment-package.dto';
import { UpdatePaymentPackageDto } from './dto/update-payment-package.dto';

@Injectable()
export class PaymentPackageService {
  create(createPaymentPackageDto: CreatePaymentPackageDto) {
    return 'This action adds a new paymentPackage';
  }

  findAll() {
    return `This action returns all paymentPackage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentPackage`;
  }

  update(id: number, updatePaymentPackageDto: UpdatePaymentPackageDto) {
    return `This action updates a #${id} paymentPackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentPackage`;
  }
}
