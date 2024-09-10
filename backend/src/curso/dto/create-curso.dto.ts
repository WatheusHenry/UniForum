import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Engenharia de Software', description: 'Nome do curso', required: true })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Curso focado em desenvolvimento de sistemas...', description: 'Descrição do curso', required: true })
  readonly description: string;
}
