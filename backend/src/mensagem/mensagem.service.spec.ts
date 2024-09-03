import { Test, TestingModule } from '@nestjs/testing';
import { MensagemService } from './mensagem.service';

describe('MensagemService', () => {
  let service: MensagemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MensagemService],
    }).compile();

    service = module.get<MensagemService>(MensagemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
