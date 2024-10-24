import { Module } from '@nestjs/common';
import { AnexoService } from './anexo.service';
import { AnexoController } from './anexo.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [UsuarioModule], // Importando UsuarioModule
  controllers: [AnexoController],
  providers: [AnexoService],
})
export class AnexoModule {}
