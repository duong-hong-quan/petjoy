import { Injectable } from "@nestjs/common";
import { CreatePetTypeDto } from "./dto/create-pet-type.dto";
import { UpdatePetTypeDto } from "./dto/update-pet-type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PetType } from "./entities/pet-type.entity";
import { Repository } from "typeorm";
import { AppActionResultDto } from "@/common/dto/app-action-result.dto";

@Injectable()
export class PetTypeService {
  constructor(
    @InjectRepository(PetType)
    private readonly petTypeRepository: Repository<PetType>
  ) {}

  async create(
    createPetTypeDto: CreatePetTypeDto
  ): Promise<AppActionResultDto> {
    const newPetType = this.petTypeRepository.create(createPetTypeDto);
    await this.petTypeRepository.save(newPetType);
    return {
      isSuccess: true,
      message: ["Pet Type created successfully"],
      data: newPetType,
    };
  }

  findAll() {
    return `This action returns all petType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petType`;
  }

  update(id: number, updatePetTypeDto: UpdatePetTypeDto) {
    return `This action updates a #${id} petType`;
  }

  remove(id: number) {
    return `This action removes a #${id} petType`;
  }
}
