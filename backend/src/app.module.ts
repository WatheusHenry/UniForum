import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { AnexoModule } from './anexo/anexo.module';
import { CursoModule } from './curso/curso.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UsuarioModule, MensagemModule, AnexoModule, CursoModule, DisciplinaModule, ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    } as TypeOrmModuleOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
          ],
          synchronize: true,
        });

        return dataSource.initialize();
      },
    },
  ];
}
