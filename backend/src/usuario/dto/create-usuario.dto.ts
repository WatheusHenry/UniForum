// create-usuario.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { TypeUser } from 'src/enums/type-user.enum';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
    required: true,
  })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email do usuário',
    required: true,
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'senha123',
    description: 'Senha do usuário',
    required: true,
  })
  readonly password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: 'array',
    items: { type: 'number' },
    description: 'IDs dos cursos em que o usuário está matriculado',
  })
  readonly courseIds?: number[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024.1',
    description: 'Período atual do usuário',
    required: true,
  })
  readonly currentTerm: string;

  @ApiProperty({
    example: 'https://example.com/profile-picture.jpg',
    description: 'URL da foto de perfil do usuário',
    required: false,
  })
  profilePicture?: string;

  @ApiProperty({
    enum: TypeUser,
    default: TypeUser.ALUNO,
    example: 'ALUNO',
    description: 'Tipo de usuário',
  })
  type: TypeUser;
}
