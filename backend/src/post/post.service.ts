/* eslint-disable @typescript-eslint/no-unused-vars */
// post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { In, Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { MinioService } from 'src/minio.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
    private readonly minioService: MinioService,
  ) {}

  async create(createPostDto: CreatePostDto, file?: Express.Multer.File) {
    const { ...rest } = createPostDto;

    let imageUrl: string = null;
    if (file) {
      imageUrl = await this.minioService.uploadFile(file);
    }

    console.log(createPostDto.user);

    // const userId = Number(createPostDto.user.id);
    const user = await this.usuarioRepository.findOne({
      where: { id: createPostDto.user },
    });
    console.log(user);

    const discipline = await this.disciplinaRepository.findOne({
      where: { id: createPostDto.disciplineID },
    });

    const post = this.postRepository.create({
      ...rest,
      user,
      discipline,
      imageUrl,
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

  async findByUserId(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<Post[]> {
    page = page < 1 ? 1 : page;
    limit = limit < 1 ? 10 : limit;

    const [posts, total] = await this.postRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['user', 'discipline'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return posts;
  }

  async findByCursoId(
    cursoId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<Post[]> {
    const disciplinas = await this.disciplinaRepository.find({
      where: { curso: { id: cursoId } },
    });

    const disciplinaIds = disciplinas.map((disciplina) => disciplina.id);

    const [posts, total] = await this.postRepository.findAndCount({
      where: { discipline: { id: In(disciplinaIds) } },
      relations: ['user', 'discipline'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return posts;
  }

  async findByMateriaId(
    materiaId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ posts: Post[]; total: number; disciplineName: string }> {
    const [posts, total] = await this.postRepository.findAndCount({
      where: { discipline: { id: materiaId } },
      relations: ['user', 'discipline'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const disciplineName = posts.length > 0 ? posts[0].discipline.name : null;

    return { posts, total, disciplineName };
  }

  async findDeletedPostsByUser(userId: number): Promise<Post[]> {
    return await this.postRepository
      .createQueryBuilder('post')
      .where('post.deletedBy = :userId', { userId })
      .andWhere('post.deletedAt IS NOT NULL')
      .withDeleted()
      .getMany();
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { user, ...rest } = updatePostDto;

    let userEntity = null;
    if (user) {
      userEntity = await this.usuarioRepository.findOne({
        where: { id: user.id },
      });
    }

    await this.postRepository.update(id, {
      ...rest,
      user: userEntity,
    });

    return this.postRepository.findOne({
      where: { id },
      relations: ['user', 'discipline'],
    });
  }

  async patchUpdate(id: number, updatePostDto: Partial<UpdatePostDto>) {
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const postExistente = await this.findOne(id);

    await this.postRepository.delete({ id });
    return postExistente;
  }

  async softDelete(postId: number, userId: number) {
    await this.postRepository.update(postId, { deletedBy: { id: userId } });
    await this.postRepository.softDelete({ id: postId });
  }
}
