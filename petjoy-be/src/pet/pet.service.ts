import { Injectable } from "@nestjs/common";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { Pet } from "./entities/pet.entity";
import { In, Not, Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "../like/entities/like.entity";
import { buildError } from "../common/utility";

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly repository: Repository<Pet>,

    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ) {}

  async create(createPetDto: CreatePetDto): Promise<AppActionResultDto> {
    try {
      const pet = await this.repository.create(createPetDto);
      await this.repository.save(pet);
      return {
        data: pet,
        message: ["Pet created successfully"],
        isSuccess: true,
      };
    } catch (error) {
      return buildError(error.message);
    }
  }

  async findAll(userId: number): Promise<AppActionResultDto> {
    const data = await this.repository.find({
      where: {
        ownerId: userId,
        isDeleted: false,
      },
      relations: ["owner", "petType", "filterPetType", "isHiringPetType"],
    });
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
    updatePetDto: UpdatePetDto
  ): Promise<AppActionResultDto> {
    await this.repository.update(id, updatePetDto);
    return {
      data: updatePetDto,
      message: ["Data updated successfully"],
      isSuccess: true,
    };
  }

  async remove(id: number): Promise<AppActionResultDto> {
    const pet = await this.repository.findOne({
      where: { id: id },
    });
    pet.isDeleted = true;
    await this.repository.save(pet);

    return {
      data: { deleted: true },
      message: ["Data deleted successfully"],
      isSuccess: true,
    };
  }
  async getPetsLike(petId: number): Promise<AppActionResultDto> {
    try {
      const likedPets = await this.likeRepository.find({
        where: {
          isLike: true,
          likePetId: petId,
        },
        relations: [
          "originPet",
          "originPet.isHiringPetType",
          "originPet.petType",
          "originPet.filterPetType",
        ],
      });

      const likedPetObjects = likedPets.map((item) => item.originPet);
      if (likedPetObjects.length > 0) {
        return {
          data: likedPetObjects,
          isSuccess: true,
          message: ["Get data successfully"],
        };
      }
    } catch (error) {
      return buildError(error.message);
    }
    return {
      data: null,
      message: ["Not found"],
      isSuccess: true,
    };
  }
  async getAvailablePetCanLike(petId: number): Promise<AppActionResultDto> {
    try {
      // Get the IDs of pets that have been matched with the given petId
      const matchData = await this.getAllPetMatched(petId);
      const dataMatchId = matchData.data as Pet[];
      const matchedPetIds = dataMatchId.map((item) => item.id);

      // Get the IDs of pets that have been liked by the given petId
      const likedPets = await this.likeRepository.find({
        where: {
          originPetId: petId,
        },
        select: ["likePetId"],
      });

      const likedPetIdArray = likedPets.map((like) => like.likePetId);

      // Get all pets that have not been liked or matched by the given petId
      const data = await this.repository.find({
        where: {
          id: Not(In([...matchedPetIds, ...likedPetIdArray, petId])),
        },
        relations: ["owner", "isHiringPetType", "petType", "filterPetType"],
      });

      // Filter out pets that have already been liked by the given petId
      const availablePets = data.filter(
        (pet) => !likedPetIdArray.includes(pet.id)
      );

      if (availablePets.length > 0) {
        return {
          data: availablePets,
          isSuccess: true,
          message: ["Get data successfully"],
        };
      }
    } catch (error) {
      return buildError(error.message);
    }
    return {
      data: null,
      message: ["Not found"],
      isSuccess: true,
    };
  }

  async getAllPet(userId: number, petId: number): Promise<AppActionResultDto> {
    try {
      const dislikes = await this.likeRepository.find({
        where: {
          likePetId: Not(petId),
          isLike: false,
        },
        select: {
          originPetId: true,
        },
      });
      const dislikedPetIds = dislikes.map((dislike) => dislike.originPetId);

      const data = await this.repository.find({
        where: {
          ownerId: Not(userId),
          id: Not(In(dislikedPetIds)),
        },
        relations: ["owner", "petType", "filterPetType", "isHiringPetType"],
      });
      return {
        data,
        isSuccess: true,
        message: [],
      };
    } catch (error) {
      return buildError(error.message);
    }
  }
  async getAllPetMatched(petId: number): Promise<AppActionResultDto> {
    try {
      // Find all likes where the given petId is the originPetId and isLike is true
      const likes = await this.likeRepository.find({
        where: {
          originPetId: petId,
          isLike: true,
        },
        relations: ["likePet", "likePet.owner"],
      });

      // Find reciprocal likes
      const matchedPets = [];
      for (const like of likes) {
        const reciprocalLike = await this.likeRepository.findOne({
          where: {
            originPetId: like.likePetId,
            likePetId: petId,
            isLike: true,
          },
          relations: ["originPet", "originPet.owner"],
        });

        if (reciprocalLike) {
          matchedPets.push(like.likePet);
        }
      }

      return {
        data: matchedPets,
        isSuccess: true,
        message: [],
      };
    } catch (error) {
      return {
        data: null,
        isSuccess: false,
        message: [error.message],
      };
    }
  }
}
