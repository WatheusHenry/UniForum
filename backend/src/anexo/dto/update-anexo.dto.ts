import { PartialType } from '@nestjs/mapped-types';
import { CreateAnexoDto } from './create-anexo.dto';

export class UpdateAnexoDto extends PartialType(CreateAnexoDto) {}
