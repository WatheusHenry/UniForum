import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CursoModule } from 'src/curso/curso.module';

@Module({
  imports: [
    UsuarioModule,CursoModule,
    TypeOrmModule.forFeature([Usuario]), // Certifique-se de que o repositório está registrado
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UsuarioService],
})
export class AuthModule {}
