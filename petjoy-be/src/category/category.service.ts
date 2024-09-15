import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { buildError } from "../common/utility";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return "This action adds a new category";
  }

  async findAll(): Promise<AppActionResultDto> {
    try {
      const data = await this.repository.find();
      return {
        data,
        isSuccess: true,
        message: ["Get data successfully"],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
