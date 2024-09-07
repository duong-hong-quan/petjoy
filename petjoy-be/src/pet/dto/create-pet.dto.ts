import { ApiProperty } from "@nestjs/swagger";

export class CreatePetDto {
  @ApiProperty({})
  name: string;
  @ApiProperty({})
  age: number;
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
