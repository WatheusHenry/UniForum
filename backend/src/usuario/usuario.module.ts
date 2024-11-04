import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { CursoModule } from 'src/curso/curso.module';
import { PostModule } from 'src/post/post.module'; // Importação de PostModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    forwardRef(() => CursoModule),
    forwardRef(() => PostModule), // Adicione o PostModule com forwardRef se houver circularidade
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule {}
