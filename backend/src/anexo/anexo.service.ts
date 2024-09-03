import { Injectable } from '@nestjs/common';
import { CreateAnexoDto } from './dto/create-anexo.dto';
import { UpdateAnexoDto } from './dto/update-anexo.dto';

@Injectable()
export class AnexoService {
  create(createAnexoDto: CreateAnexoDto) {
    return 'This action adds a new anexo';
  }

  findAll() {
    return `This action returns all anexo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anexo`;
  }

  update(id: number, updateAnexoDto: UpdateAnexoDto) {
    return `This action updates a #${id} anexo`;
  }

  remove(id: number) {
    return `This action removes a #${id} anexo`;
  }
}
