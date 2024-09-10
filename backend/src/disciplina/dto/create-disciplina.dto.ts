import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDisciplinaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Programação Orientada a Objetos', description: 'Nome da disciplina', required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Disciplina voltada para técnicas de POO...', description: 'Descrição da disciplina', required: true })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ID do curso ao qual a disciplina pertence', required: true })
  cursoId: number; // ID do curso ao qual a disciplina será vinculada
}
