import { IsString, IsEmail, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  readonly cursos: number[]; // Array de IDs dos cursos nos quais o usuário está matriculado

  @IsString()
  @IsNotEmpty()
  readonly termo: string;
}
