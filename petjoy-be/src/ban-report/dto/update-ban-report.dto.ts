import { PartialType } from '@nestjs/swagger';
import { CreateBanReportDto } from './create-ban-report.dto';

export class UpdateBanReportDto extends PartialType(CreateBanReportDto) {}
