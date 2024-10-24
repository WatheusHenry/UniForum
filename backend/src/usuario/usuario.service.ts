import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario)
  private readonly usuarioRepository: Repository<Usuario>,
  @InjectRepository(Curso) 
  private readonly cursoRepository: Repository<Curso>,
  ) { }


  async create(createUsuarioDto: CreateUsuarioDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, salt);
  
    let curso: Curso | null = null; // Inicialize como null
  
    if (createUsuarioDto.courseIds && createUsuarioDto.courseIds.length > 0) {
      curso = await this.cursoRepository.findOneBy({ id: createUsuarioDto.courseIds[0] }); // Assumindo que apenas um curso é selecionado
    }
  
    const usuario = await this.usuarioRepository.save({
      ...createUsuarioDto,
      password: hashedPassword,
      curso, 
    });
  
    return usuario;
  }
  

  findAll() {
    const usuario = this.usuarioRepository.find()
    return usuario;
  }

  findOneById(id: number) {
    const usuario = this.usuarioRepository.findOne({
      where: { id }
    })
    return usuario;
  }

  findOneByEmail(email: string) {
    const usuario = this.usuarioRepository.findOne({
      where: { email }
    })
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const usuarioAtualizado = { ...usuarioExistente };

    // Se a senha for enviada no DTO, ela será criptografada antes de ser atualizada
    if (updateUsuarioDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, salt);
    }

    Object.keys(updateUsuarioDto).forEach((key) => {
      if (usuarioExistente[key] !== updateUsuarioDto[key]) {
        usuarioAtualizado[key] = updateUsuarioDto[key];
      }
    });

    return this.usuarioRepository.save(usuarioAtualizado);
  }

  async updatePassword(id: number, newPassword: string) {
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt); 

    usuarioExistente.password = hashedPassword;

    return this.usuarioRepository.save(usuarioExistente);
  }


  remove(id: number) {
    this.findOneById(id);
    this.usuarioRepository.delete({ id: id });
    return 'user deleted';
  }
}
