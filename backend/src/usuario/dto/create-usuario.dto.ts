import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { Curso } from 'src/curso/entities/curso.entity';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário', required: true })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'john.doe@example.com', description: 'Email do usuário', required: true })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'senha123', description: 'Senha do usuário', required: true })
  readonly password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ required: true, isArray: true })
  readonly courses: Curso[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '2024.1', description: 'Período atual do usuário', required: true })
  readonly currentTerm: string;
}
