import { forwardRef, Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Curso]),forwardRef(() =>UsuarioModule)],  // Aqui você importa o repositório do Curso
  controllers: [CursoController],
  providers: [CursoService, AuthGuard], // Inclua o AuthGuard aqui
  exports: [TypeOrmModule],  // Exportando o TypeOrmModule para que o CursoRepository possa ser utilizado em outros módulos

})
export class CursoModule { }
