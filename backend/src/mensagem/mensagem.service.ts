import { Injectable } from '@nestjs/common';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';

@Injectable()
export class MensagemService {
  create(createMensagemDto: CreateMensagemDto) {
    return 'This action adds a new mensagem';
  }

  findAll() {
    return `This action returns all mensagem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mensagem`;
  }

  update(id: number, updateMensagemDto: UpdateMensagemDto) {
    return `This action updates a #${id} mensagem`;
  }

  remove(id: number) {
    return `This action removes a #${id} mensagem`;
  }
}
