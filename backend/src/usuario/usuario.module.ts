import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { CursoModule } from 'src/curso/curso.module';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => CursoModule)],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports:[UsuarioService]
})
export class UsuarioModule { }
