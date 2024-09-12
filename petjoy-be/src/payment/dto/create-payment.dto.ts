import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({})
  userId: number;
  @ApiProperty({})
  paymentPackageId: number;
}
