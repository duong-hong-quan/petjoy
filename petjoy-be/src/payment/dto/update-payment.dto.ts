import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreatePaymentDto } from "./create-payment.dto";

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  status: boolean;
}
