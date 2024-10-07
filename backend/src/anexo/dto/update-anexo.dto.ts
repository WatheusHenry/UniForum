import { PartialType } from '@nestjs/mapped-types';
import { CreateAnexoDto } from './create-anexo.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnexoDto extends PartialType(CreateAnexoDto) {
    @ApiProperty({ required: true })
    id: number;
}
