/* eslint-disable @typescript-eslint/no-unused-vars */
// post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { userId, disciplineId, ...rest } = createPostDto;

    const user = await this.usuarioRepository.findOne({
      where: { id: userId },
    });
    const discipline = await this.disciplinaRepository.findOne({
      where: { id: disciplineId },
    });

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
    page = page < 1 ? 1 : page;
    limit = limit < 1 ? 10 : limit;

    const [posts, total] = await this.postRepository.findAndCount({
      relations: ['user', 'discipline'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
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
