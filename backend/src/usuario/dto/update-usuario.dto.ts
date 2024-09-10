import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsString()
  @IsOptional()
  @ApiProperty()

  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()

  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()

  password?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  courses?: number[]; // Array de IDs dos cursos nos quais o usuário está matriculado

  @IsString()
  @IsOptional()
  @ApiProperty()
  currentTerm?: string;
}
