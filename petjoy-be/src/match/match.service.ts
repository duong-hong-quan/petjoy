import { Injectable } from "@nestjs/common";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { Match } from "./entities/match.entity";
import { Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { User } from "../user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private repository: Repository<Match>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async create(createMatchDto: CreateMatchDto): Promise<AppActionResultDto> {
    const user1 = await this.userRepository.findOne({
      where: { id: createMatchDto.userId1 },
    });
    const user2 = await this.userRepository.findOne({
      where: { id: createMatchDto.userId2 },
    });
    if (!user1 || !user2) {
      return {
        data: null,
        message: ["User not found"],
        isSuccess: false,
      };
    }
    const match = await this.repository.create();
    await this.repository.save(match);
    return {
      data: match,
      message: ["Match created successfully"],
      isSuccess: true,
    };
  }

  async findAll(): Promise<AppActionResultDto> {
    const data = await this.repository.find({ relations: ["user1", "user2"] });
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }

  async findOne(id: number): Promise<AppActionResultDto> {
    const data = await this.repository.findOne({
      where: { id },
      relations: ["user1", "user2"],
    });
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  async remove(id: number): Promise<AppActionResultDto> {
    await this.repository.delete(id);
    return {
      data: { deleted: true },
      message: ["Data deleted successfully"],
      isSuccess: true,
    };
  }
}
