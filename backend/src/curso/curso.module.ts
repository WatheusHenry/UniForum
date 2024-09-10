import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso])],  // Aqui você importa o repositório do Curso
  controllers: [CursoController],
  providers: [CursoService],
  exports: [TypeOrmModule],  // Exportando o TypeOrmModule para que o CursoRepository possa ser utilizado em outros módulos

})
export class CursoModule { }
