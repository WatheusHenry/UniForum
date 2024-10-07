import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  async create(createPostDto: CreatePostDto) {
    return await this.postRepository.save(createPostDto);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: Partial<UpdatePostDto>) {
    const postExistente = await this.postRepository.findOne({ where: { id } });

    if (!postExistente) {
      throw new NotFoundException(`Postagem com ID ${id} não encontrado`);
    }

    return await this.update(id, updatePostDto)
  }

  async remove(id: number) {
    const postExistente = await this.postRepository.findOne({ where: { id } });

    if (!postExistente) {
      throw new NotFoundException(`Postagem com ID ${id} não encontrado`);
    }

    await this.postRepository.delete({ id });
  }
}
