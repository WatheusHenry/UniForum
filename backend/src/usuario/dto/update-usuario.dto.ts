import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsString()
  @IsOptional()
  @ApiProperty()

  readonly name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()

  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()

  readonly password?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly courses?: number[]; // Array de IDs dos cursos nos quais o usuário está matriculado

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly currentTerm?: string;
}
