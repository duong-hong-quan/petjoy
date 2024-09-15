import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateBlogDto } from "./create-blog.dto";

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({})
  id: number;
}
