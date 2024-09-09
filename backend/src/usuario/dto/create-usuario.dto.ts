import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly courses: number[]; // Array de IDs dos cursos nos quais o usuário está matriculado

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly currentTerm: string;
}
