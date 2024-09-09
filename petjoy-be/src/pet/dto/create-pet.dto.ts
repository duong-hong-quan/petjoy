import { ApiProperty } from "@nestjs/swagger";
import { Timestamp } from "typeorm";

export class CreatePetDto {
  @ApiProperty({})
  name: string;
  @ApiProperty({})
  dob: Date;
  @ApiProperty({})
  breed: string;
  @ApiProperty({})
  profilePicture: string;
  @ApiProperty({})
  ownerId: number;
  @ApiProperty({})
  petTypeId: number;
  @ApiProperty({})
  isHiringPetTypeId: number;
  @ApiProperty({})
  filterPetTypeId: number;
}
