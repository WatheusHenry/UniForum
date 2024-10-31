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
    // Certifique-se de que você está passando o usuário corretamente
    const { userId, disciplineId, ...rest } = createPostDto;

    // Você pode precisar buscar as entidades relacionadas antes de criar o post
    const user = await this.userRepository.findOne(userId); // Certifique-se de ter o repositório do usuário injetado
    const discipline = await this.disciplineRepository.findOne(disciplineId); // Certifique-se de ter o repositório da disciplina injetado

    const post = this.postRepository.create({
      ...rest,
      user,
      discipline,
    });

    await this.postRepository.save(post);
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
