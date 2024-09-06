import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { LoginRequestDto } from "./dto/login-request.dto";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AppActionResultDto> {
    const user = await this.repository.create(createUserDto);
    await this.repository.save(user);
    return {
      data: user,
      message: ["User created successfully"],
      isSuccess: true,
    };
  }

  async findAll(): Promise<AppActionResultDto> {
    const data = await this.repository.find();
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }

  async findOne(id: number): Promise<AppActionResultDto> {
    const data = await this.repository.findOne({ where: { id } });
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<AppActionResultDto> {
    await this.repository.update(id, updateUserDto);
    return {
      data: updateUserDto,
      message: ["Data updated successfully"],
      isSuccess: true,
    };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return { deleted: true };
  }

  async login(request: LoginRequestDto): Promise<AppActionResultDto> {
    const data = await this.repository.findOne({
      where: {
        email: request.username,
        password: request.password,
      },
    });
    return {
      data,
      message: data ? ["Login success"] : ["Login failed"],
      isSuccess: !!data,
    };
  }
}
