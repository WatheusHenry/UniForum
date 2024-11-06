import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { DisciplinaModule } from 'src/disciplina/disciplina.module';
import { MessageModule } from 'src/message/message.module';
import { MinioService } from 'src/minio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => UsuarioModule), // Use forwardRef
    DisciplinaModule,
    forwardRef(() => MessageModule), // Use forwardRef
  ],
  controllers: [PostController],
  providers: [PostService, MinioService], // Add MinioService here if it's not part of another module
  exports: [PostService, TypeOrmModule, MinioService],
})
export class PostModule {}
