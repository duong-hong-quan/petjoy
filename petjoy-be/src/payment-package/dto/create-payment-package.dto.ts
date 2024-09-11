import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentPackageDto {
  @ApiProperty({})
  name: string;
  @ApiProperty({})
  price: number;
  @ApiProperty({})
  description: string;
  @ApiProperty({})
  duration: number;
}
