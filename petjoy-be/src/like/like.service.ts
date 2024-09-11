import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { Like } from "./entities/like.entity";
import { Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { User } from "../user/entities/user.entity";
import { Pet } from "../pet/entities/pet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { buildError } from "../common/utility";

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
    try {
      const orignPet = await this.repository.find({
        where: {
          id: createLikeDto.originPetId,
        },
      });
      const likePetDb = await this.repository.find({
        where: {
          id: createLikeDto.likePetId,
        },
      });
      if (!orignPet || !likePetDb) {
        return buildError("Not found");
      }
      const likeDb = await this.repository.findOne({
        where: {
          originPetId: createLikeDto.originPetId,
          likePetId: createLikeDto.likePetId,
        },
      });
      if (likeDb) {
        return buildError("You already like this pet");
      }
      const like = await this.repository.create(createLikeDto);
      await this.repository.save(like);
      const data = await this.repository.findOne({
        where: {
          originPetId: createLikeDto.likePetId,
          likePetId: createLikeDto.originPetId,
        },
      });
      const fullLike = await this.repository.findOne({
        where: { id: like.id },
        relations: ["originPet", "likePet"], // Adjust the relations as per your entity
      });
      if (data) {
        return {
          data: fullLike,
          message: ["Matchingggg"],
          isSuccess: true,
        };
      }
      return {
        data: fullLike,
        message: ["Like created successfully"],
        isSuccess: true,
      };
    } catch (error) {
      return buildError(error.message);
    }
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
