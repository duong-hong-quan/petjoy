import { Injectable } from "@nestjs/common";
import { CreatePaymentPackageDto } from "./dto/create-payment-package.dto";
import { UpdatePaymentPackageDto } from "./dto/update-payment-package.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentPackage } from "./entities/payment-package.entity";
import { Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { buildError } from "../common/utility";

@Injectable()
export class PaymentPackageService {
  constructor(
    @InjectRepository(PaymentPackage)
    private readonly repository: Repository<PaymentPackage>
  ) {}
  async create(
    createPaymentPackageDto: CreatePaymentPackageDto
  ): Promise<AppActionResultDto> {
    const data = await this.repository.create(createPaymentPackageDto);
    await this.repository.save(data);
    return {
      data: data,
      isSuccess: true,
      message: ["Create data successfully"],
    };
  }

  async findAll(): Promise<AppActionResultDto> {
    return {
      data: await this.repository.find(),
      isSuccess: true,
      message: ["Get data successfully"],
    };
  }

  async findOne(id: number): Promise<AppActionResultDto> {
    return {
      data: await this.repository.find({
        where: {
          id,
        },
      }),
      isSuccess: true,
      message: ["Get data successfully"],
    };
  }

  async update(
    id: number,
    updatePaymentPackageDto: UpdatePaymentPackageDto
  ): Promise<AppActionResultDto> {
    try {
      const data = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (data) {
        Object.assign(data, updatePaymentPackageDto);
        return {
          data,
          isSuccess: true,
          message: ["Update successfully"],
        };
      }
    } catch (error) {
      return buildError(error.message);
    }
  }

  async remove(id: number): Promise<AppActionResultDto> {
    try {
      const data = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (data) {
        this.repository.remove(data);
        return {
          data,
          isSuccess: true,
          message: ["Delete successfully"],
        };
      }
    } catch (error) {
      return buildError(error.message);
    }
  }
}
