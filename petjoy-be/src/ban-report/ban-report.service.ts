import { Injectable } from "@nestjs/common";
import { CreateBanReportDto } from "./dto/create-ban-report.dto";
import { UpdateBanReportDto } from "./dto/update-ban-report.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BanReport } from "./entities/ban-report.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";

@Injectable()
export class BanReportService {
  constructor(
    @InjectRepository(BanReport)
    private readonly repository: Repository<BanReport>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async create(
    createBanReportDto: CreateBanReportDto
  ): Promise<AppActionResultDto> {
    const reporter = await this.userRepository.findOne({
      where: {
        id: createBanReportDto.reporterId,
      },
    });
    if (!reporter) {
      return {
        data: null,
        message: ["Reporter not found"],
        isSuccess: false,
      };
    }
    const reported = await this.userRepository.findOne({
      where: {
        id: createBanReportDto.reportedId,
      },
    });
    if (!reported) {
      return {
        data: null,
        message: ["Reported user not found"],
        isSuccess: false,
      };
    }
    const banReport = await this.repository.create(createBanReportDto);
    await this.repository.save(banReport);
    return {
      data: banReport,
      message: ["BanReport created successfully"],
      isSuccess: true,
    };
  }

  async findAll(): Promise<AppActionResultDto> {
    const data = await this.repository.find({
      relations: ["reporter", "reported"],
    });
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }
}
