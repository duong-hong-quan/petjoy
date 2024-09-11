import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { PaymentPackageService } from "./payment-package.service";
import { CreatePaymentPackageDto } from "./dto/create-payment-package.dto";
import { UpdatePaymentPackageDto } from "./dto/update-payment-package.dto";

@Controller("payment-package")
export class PaymentPackageController {
  constructor(private readonly paymentPackageService: PaymentPackageService) {}

  @Post()
  create(@Body() createPaymentPackageDto: CreatePaymentPackageDto) {
    return this.paymentPackageService.create(createPaymentPackageDto);
  }

  @Get()
  findAll() {
    return this.paymentPackageService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentPackageService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updatePaymentPackageDto: UpdatePaymentPackageDto
  ) {
    return this.paymentPackageService.update(+id, updatePaymentPackageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentPackageService.remove(+id);
  }
}
