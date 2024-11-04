import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { DisciplinaModule } from 'src/disciplina/disciplina.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => UsuarioModule), // Use forwardRef
    DisciplinaModule,
    forwardRef(() => MessageModule), // Use forwardRef
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService, TypeOrmModule],
})
export class PostModule {}
