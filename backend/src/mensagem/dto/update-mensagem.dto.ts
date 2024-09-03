import { PartialType } from '@nestjs/mapped-types';
import { CreateMensagemDto } from './create-mensagem.dto';

export class UpdateMensagemDto extends PartialType(CreateMensagemDto) {}
