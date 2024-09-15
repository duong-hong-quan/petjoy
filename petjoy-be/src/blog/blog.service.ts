import { Injectable } from "@nestjs/common";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from "./entities/blog.entity";
import { Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { buildError } from "../common/utility";
import { Category } from "../category/entities/category.entity";
import { User } from "../user/entities/user.entity";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly repository: Repository<Blog>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async create(createBlogDto: CreateBlogDto): Promise<AppActionResultDto> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id: createBlogDto.categoryId,
        },
      });
      const user = await this.userRepository.findOne({
        where: {
          id: createBlogDto.userId,
        },
      });
      if (!category) {
        return buildError("Category not found");
      }
      if (!user) {
        return buildError("User not found");
      }
      const data = await this.repository.create(createBlogDto);
      await this.repository.save(data);
      return {
        data: data,
        isSuccess: true,
        message: ["Create blog successfully"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }

  async findAll(): Promise<AppActionResultDto> {
    try {
      const categories = await this.categoryRepository.find({
        relations: ["blogs"],
      });
      return {
        data: categories,
        isSuccess: true,
        message: ["success"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }
  async getAll(): Promise<AppActionResultDto> {
    try {
      const categories = await this.repository.find({
        relations: ["user", "category"],
      });
      return {
        data: categories,
        isSuccess: true,
        message: ["success"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }
  async findOne(id: number): Promise<AppActionResultDto> {
    try {
      const data = await this.repository.findOne({
        where: {
          id,
        },
        relations: ["category", "user"],
      });
      return {
        data,
        isSuccess: true,
        message: ["Get data successfully"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }

  async update(updateBlogDto: UpdateBlogDto): Promise<AppActionResultDto> {
    try {
      const blog = await this.repository.findOne({
        where: {
          id: updateBlogDto.id,
        },
      });
      if (!blog) {
        return buildError("Blog not found");
      }
      const category = await this.categoryRepository.findOne({
        where: {
          id: updateBlogDto.categoryId,
        },
      });
      const user = await this.userRepository.findOne({
        where: {
          id: updateBlogDto.userId,
        },
      });
      if (!category) {
        return buildError("Category not found");
      }
      if (!user) {
        return buildError("User not found");
      }
      Object.assign(blog, updateBlogDto);
      await this.repository.save(updateBlogDto);
      return {
        data: blog,
        isSuccess: true,
        message: ["Update successfully"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }

  async remove(id: number): Promise<AppActionResultDto> {
    try {
      const blog = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      await this.repository.remove(blog);
      return {
        data: null,
        isSuccess: true,
        message: ["Update successfully"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }
}
