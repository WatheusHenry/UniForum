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
      relations: ['user', 'discipline'],
    });
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Post[]> {
    const [posts, total] = await this.postRepository.findAndCount({
      relations: ['user', 'discipline'],
      skip: (page - 1) * limit, // Pular posts já recuperados
      take: limit, // Limitar a quantidade de posts retornados
    });

    return posts;
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
