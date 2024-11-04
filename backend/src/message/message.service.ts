import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { postId, userId, parentMessageId, content } = createMessageDto;

    const post = await this.postRepository.findOne({ where: { id: postId } });
    const user = await this.usuarioRepository.findOne({
      where: { id: userId },
    });
    const parentMessage = parentMessageId
      ? await this.messageRepository.findOne({ where: { id: parentMessageId } })
      : null;

    if (!post || !user) {
      throw new NotFoundException('Post ou usuário não encontrado');
    }

    const newMessage = this.messageRepository.create({
      content,
      post,
      user,
      parentMessage,
    });

    return await this.messageRepository.save(newMessage);
  }

  async findAll() {
    return await this.messageRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: [
        'user',
        'discipline',
        'messages',
        'messages.user',
        'messages.replies',
      ],
    });

    if (!post) {
      throw new NotFoundException(`Postagem com ID ${id} não encontrado`);
    }

    return post;
  }

  async findByPost(postId: number) {
    return await this.messageRepository.find({
      where: { post: { id: postId } },
      relations: ['user', 'replies', 'replies.user'],
      order: { createdAt: 'ASC' },
    });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    return await this.messageRepository.update(id, updateMessageDto);
  }

  async remove(id: number) {
    return await this.messageRepository.delete(id);
  }
}
