import { Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disciplina } from './entities/disciplina.entity';
import { CursoModule } from 'src/curso/curso.module';

@Module({
  imports: [TypeOrmModule.forFeature([Disciplina]), CursoModule,
  ],  // Aqui você importa o repositório do Curso
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
})
export class DisciplinaModule { }
