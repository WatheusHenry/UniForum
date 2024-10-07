import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    return await this.messageRepository.save(createMessageDto);
  }

  async findAll() {
    return await this.messageRepository.find();
  }

  async findOne(id: number) {
    return await this.messageRepository.findOne({ where: { id } })
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    return await this.messageRepository.update(id, updateMessageDto);
  }

  async remove(id: number) {
    return await this.messageRepository.delete(id);
  }
}
