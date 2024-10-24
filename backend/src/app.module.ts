import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AnexoModule } from './anexo/anexo.module';
import { CursoModule } from './curso/curso.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    UsuarioModule,
    AnexoModule,
    CursoModule,
    DisciplinaModule,
    ConfigModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: ['dist/migrations/*.js'], // Caminho para as migrations
      cli: {
        migrationsDir: 'src/migrations',
      },
    } as TypeOrmModuleOptions),
    PostModule,
    MessageModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
