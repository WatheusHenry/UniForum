import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Curso } from 'src/curso/entities/curso.entity';

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
  courses?: Curso[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  currentTerm?: string;
}
