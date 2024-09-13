import { Controller, Get, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ReportService } from "./report.service";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";

@ApiTags("Reports")
@Controller("reports")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiQuery({
    name: "from",
    type: String,
    required: false,
    description: "Start date in YYYY-MM-DD format",
  })
  @ApiQuery({
    name: "to",
    type: String,
    required: false,
    description: "End date in YYYY-MM-DD format",
  })
  async getReport(
    @Query("from") from: string,
    @Query("to") to: string
  ): Promise<AppActionResultDto> {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    return this.reportService.getReport(fromDate, toDate);
  }
}
