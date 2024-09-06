import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { Like } from "./entities/like.entity";
import { Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { User } from "../user/entities/user.entity";
import { Pet } from "../pet/entities/pet.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly repository: Repository<Like>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>
  ) {}
  async create(createLikeDto: CreateLikeDto): Promise<AppActionResultDto> {
    const user = await this.userRepository.findOne({
      where: { id: createLikeDto.userId },
    });
    const pet = await this.petRepository.findOne({
      where: { id: createLikeDto.petId },
    });
    if (!user || !pet) {
      return {
        data: null,
        message: ["User or Pet not found"],
        isSuccess: false,
      };
    }
    const like = await this.repository.create({
      user,
      pet,
    });
    await this.repository.save(like);
    return {
      data: like,
      message: ["Like created successfully"],
      isSuccess: true,
    };
  }

  async findAll(): Promise<AppActionResultDto> {
    const data = await this.repository.find({ relations: ["user", "pet"] });
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
