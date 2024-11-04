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
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":userid")
  findAllByUser(@Param("userid") userid: number) {
    return this.paymentService.findAllByUser(userid);
  }
  @Get("current-payment-package/:userid")
  getCurrentUserPayment(@Param("userid") userid: number) {
    return this.paymentService.getCurrentUserPayment(userid);
  }

  @Put()
  update(@Body() dto: UpdatePaymentDto) {
    return this.paymentService.update(dto.id, dto.status);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
