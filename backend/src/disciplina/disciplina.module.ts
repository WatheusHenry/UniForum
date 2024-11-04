import { forwardRef, Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disciplina } from './entities/disciplina.entity';
import { PostModule } from 'src/post/post.module'; // Importação de PostModule se necessário
import { CursoModule } from 'src/curso/curso.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Disciplina]),
    forwardRef(() => PostModule), // Use forwardRef se DisciplinaModule depender de PostModule
    forwardRef(() => CursoModule), // Use forwardRef se houver dependência circular
  ],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
  exports: [DisciplinaService, TypeOrmModule],
})
export class DisciplinaModule {}
