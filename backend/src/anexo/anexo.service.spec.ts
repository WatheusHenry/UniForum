import { Test, TestingModule } from '@nestjs/testing';
import { AnexoService } from './anexo.service';

describe('AnexoService', () => {
  let service: AnexoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnexoService],
    }).compile();

    service = module.get<AnexoService>(AnexoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
