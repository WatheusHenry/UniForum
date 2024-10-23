import { PartialType } from '@nestjs/mapped-types';
import { CreateDisciplinaDto } from './create-disciplina.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDisciplinaDto extends PartialType(CreateDisciplinaDto) {
    @ApiProperty({ required: true })
    id: number;
}
