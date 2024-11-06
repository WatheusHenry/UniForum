import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, salt);

    let curso: Curso | null = null;
    if (createUsuarioDto.courseIds && createUsuarioDto.courseIds.length > 0) {
      curso = await this.cursoRepository.findOneBy({
        id: createUsuarioDto.courseIds[0],
      });
    }

    const usuario = await this.usuarioRepository.save({
      ...createUsuarioDto,
      password: hashedPassword,
      curso,
    });

    return usuario;
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOneById(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['curso'], // Inclui o curso vinculado
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return usuario;
  }

  async findOneByEmail(email: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    if (updateUsuarioDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUsuarioDto.password = await bcrypt.hash(
        updateUsuarioDto.password,
        salt,
      );
    }

    return await this.usuarioRepository.save({
      ...usuarioExistente,
      ...updateUsuarioDto,
    });
  }

  async updatePassword(id: number, newPassword: string) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    usuarioExistente.password = hashedPassword;

    return await this.usuarioRepository.save(usuarioExistente); // Use await
  }

  async remove(id: number) {
    const usuarioExistente = await this.findOneById(id); // Verifica se o usuário existe

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    await this.usuarioRepository.delete({ id }); // Use await
    return 'Usuário deletado com sucesso';
  }
}
