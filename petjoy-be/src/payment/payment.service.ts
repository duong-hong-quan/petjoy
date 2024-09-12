import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { User } from "../user/entities/user.entity";
import { buildError } from "../common/utility";
import { PaymentPackage } from "../payment-package/entities/payment-package.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PaymentPackage)
    private readonly paymentPackageRepository: Repository<PaymentPackage>
  ) {}
  async create(
    createPaymentDto: CreatePaymentDto
  ): Promise<AppActionResultDto> {
    try {
      if (!createPaymentDto) {
        return buildError("Invalid payment data");
      }

      let payment: Payment = new Payment();
      Object.assign(payment, createPaymentDto);
      payment.paymentDate = new Date();

      const data = await this.paymentPackageRepository.findOne({
        where: {
          id: payment.paymentPackageId,
        },
      });

      const dataUser = await this.userRepository.findOne({
        where: {
          id: payment.userId,
        },
      });
      console.log(data);
      console.log(dataUser);

      if (!data || !dataUser) {
        return buildError(
          "User is not existed, or payment package is not existed"
        );
      }

      payment.amount = data.price;

      // Assuming create does not return a promise
      this.repository.create(payment);
      await this.repository.save(payment);

      return {
        data: payment,
        isSuccess: true,
        message: ["Create data success"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }

  async findAll(): Promise<AppActionResultDto> {
    try {
      return {
        data: await this.repository.find({
          relations: ["user", "paymentPackage"],
        }),
        isSuccess: true,
        message: ["Get data successfully"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  async update(id: number, status: boolean): Promise<AppActionResultDto> {
    try {
      let data = await this.repository.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        return buildError("The payment is not existed");
      }

      console.log("Before update:", data);

      data.status = status;
      console.log("After update:", data);

      await this.repository.save(data);

      const updatedData = await this.repository.findOne({
        where: {
          id,
        },
      });

      console.log("After save:", updatedData);

      return {
        data: updatedData,
        isSuccess: true,
        message: ["Update successfully"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }
  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
