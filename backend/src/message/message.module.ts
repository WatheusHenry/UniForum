import { forwardRef, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => UsuarioModule), // Use forwardRef
    forwardRef(() => PostModule), // Use forwardRef
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService, TypeOrmModule],
})
export class MessageModule {}
