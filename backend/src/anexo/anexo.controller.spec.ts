import { Test, TestingModule } from '@nestjs/testing';
import { AnexoController } from './anexo.controller';
import { AnexoService } from './anexo.service';

describe('AnexoController', () => {
  let controller: AnexoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnexoController],
      providers: [AnexoService],
    }).compile();

    controller = module.get<AnexoController>(AnexoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
