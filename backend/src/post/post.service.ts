/* eslint-disable @typescript-eslint/no-unused-vars */
// post.service.ts
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
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = await this.postRepository.save(createPostDto);
    return this.postRepository.findOne({
      where: { id: post.id },
      relations: ['usuario', 'disciplina'],
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['user', 'discipline'], // Certifique-se de que essas relações estão corretas
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'discipline'],
    });

    if (!post) {
      throw new NotFoundException(`Postagem com ID ${id} não encontrado`);
    }

    return post;
  }

  async update(id: number, updatePostDto: Partial<UpdatePostDto>) {
    const postExistente = await this.findOne(id); // Reutilizando o método findOne

    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOne({
      where: { id },
      relations: ['user', 'discipline'],
    });
  }

  async remove(id: number) {
    const postExistente = await this.findOne(id); // Reutilizando o método findOne

    await this.postRepository.delete({ id });
    return postExistente; // Retornar o post removido, se necessário
  }
}
