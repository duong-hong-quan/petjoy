import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { PetService } from "./pet.service";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";

@Controller("pet")
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  @Get("by-user-id/:userId")
  findAll(@Param("userId") userId: number) {
    return this.petService.findAll(userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.petService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(+id, updatePetDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.petService.remove(+id);
  }
  @Get("get-likes/:petId")
  getLike(@Param("petId") id: number) {
    return this.petService.getPetsLike(id);
  }
  @Get("get-all-pet/:userId")
  getAllPet(@Param("userId") userId: number, @Param("petId") petId: number) {
    return this.petService.getAllPet(userId, petId);
  }
  @Get("get-all-pet-matched/:petId")
  getAllPetMatched(@Param("petId") petId: number) {
    return this.petService.getAllPetMatched(petId);
  }
  @Get("get-available-pet-can-like/:petId")
  getAvailablePetCanLike(@Param("petId") petId: number) {
    return this.petService.getAvailablePetCanLike(petId);
  }
}
