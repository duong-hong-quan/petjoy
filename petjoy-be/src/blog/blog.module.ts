import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./entities/blog.entity";
import { User } from "../user/entities/user.entity";
import { Category } from "../category/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User, Category])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
