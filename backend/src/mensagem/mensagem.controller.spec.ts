import { Test, TestingModule } from '@nestjs/testing';
import { MensagemController } from './mensagem.controller';
import { MensagemService } from './mensagem.service';

describe('MensagemController', () => {
  let controller: MensagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MensagemController],
      providers: [MensagemService],
    }).compile();

    controller = module.get<MensagemController>(MensagemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
