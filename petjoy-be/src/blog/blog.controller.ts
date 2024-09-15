import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get("all")
  getAll() {
    return this.blogService.getAll();
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.blogService.findOne(+id);
  }

  @Put()
  update(@Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(updateBlogDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.blogService.remove(+id);
  }
}
