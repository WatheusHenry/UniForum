import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario)
  private readonly usuarioRepository: Repository<Usuario>
  ) { }


  create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuarioRepository.save(createUsuarioDto)
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

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const usuarioAtualizado = { ...usuarioExistente };

    Object.keys(updateUsuarioDto).forEach(key => {

      if (usuarioExistente[key] !== updateUsuarioDto[key]) {
        usuarioAtualizado[key] = updateUsuarioDto[key];
      }
    });

    return this.usuarioRepository.save(usuarioAtualizado);
  }



  remove(id: number) {
    this.findOneById(id);
    this.usuarioRepository.delete({ id: id });
    return 'user deleted';
  }
}
