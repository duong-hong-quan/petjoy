import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeDto {
  @ApiProperty({})
  originPetId: number;
  @ApiProperty({})
  likePetId: number;
  @ApiProperty({})
  isLike: boolean;
}
