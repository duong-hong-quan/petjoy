import { ApiProperty } from "@nestjs/swagger";

export class CreateBlogDto {
  @ApiProperty({})
  blogName: string;
  @ApiProperty({})
  blogImg: string;
  @ApiProperty({})
  content: string;
  @ApiProperty({})
  userId: number;
  @ApiProperty({})
  categoryId: number;
}
