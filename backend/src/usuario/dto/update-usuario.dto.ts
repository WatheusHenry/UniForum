import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsString, IsEmail, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  readonly courses?: number[]; // Array de IDs dos cursos nos quais o usuário está matriculado

  @IsString()
  @IsOptional()
  readonly currentTerm?: string;
}
