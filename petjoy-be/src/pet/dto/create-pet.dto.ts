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
}
