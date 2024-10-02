import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BanReportService } from "./ban-report.service";
import { CreateBanReportDto } from "./dto/create-ban-report.dto";
import { UpdateBanReportDto } from "./dto/update-ban-report.dto";

@Controller("ban-report")
export class BanReportController {
  constructor(private readonly banReportService: BanReportService) {}

  @Post()
  create(@Body() createBanReportDto: CreateBanReportDto) {
    return this.banReportService.create(createBanReportDto);
  }

  @Get()
  findAll() {
    return this.banReportService.findAll();
  }
}
