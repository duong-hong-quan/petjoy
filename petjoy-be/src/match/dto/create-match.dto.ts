import { ApiProperty } from "@nestjs/swagger";

export class CreateMatchDto {
  @ApiProperty({})
  userId1: number;
  @ApiProperty({})
  userId2: number;
}
