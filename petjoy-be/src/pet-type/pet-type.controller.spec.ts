import { Test, TestingModule } from '@nestjs/testing';
import { PetTypeController } from './pet-type.controller';
import { PetTypeService } from './pet-type.service';

describe('PetTypeController', () => {
  let controller: PetTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetTypeController],
      providers: [PetTypeService],
    }).compile();

    controller = module.get<PetTypeController>(PetTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
