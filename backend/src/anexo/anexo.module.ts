import { Module } from '@nestjs/common';
import { AnexoService } from './anexo.service';
import { AnexoController } from './anexo.controller';

@Module({
  controllers: [AnexoController],
  providers: [AnexoService],
})
export class AnexoModule {}
