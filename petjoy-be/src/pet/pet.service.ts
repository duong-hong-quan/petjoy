import { Injectable } from "@nestjs/common";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { Pet } from "./entities/pet.entity";
import { Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly repository: Repository<Pet>
  ) {}

  async create(createPetDto: CreatePetDto): Promise<AppActionResultDto> {
    const pet = await this.repository.create(createPetDto);
    await this.repository.save(pet);
    return {
      data: pet,
      message: ["Pet created successfully"],
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
    await this.repository.delete(id);
    return {
      data: { deleted: true },
      message: ["Data deleted successfully"],
      isSuccess: true,
    };
  }
}
