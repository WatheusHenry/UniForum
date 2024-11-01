import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { DisciplinaModule } from 'src/disciplina/disciplina.module';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Usuario, Disciplina]),
    UsuarioModule,
    DisciplinaModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
