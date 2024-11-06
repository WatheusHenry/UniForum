import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreatePostDto {
  @ApiProperty({ required: true, maxLength: 255 })
  title: string;

  @ApiProperty({ required: true, maxLength: 255 })
  content: string;

  @ApiProperty({ required: true })
  createdAt: Date;

  @IsNotEmpty()
  user: Usuario; // ou o tipo que representa seu usuário

  @IsNotEmpty()
  disciplineID: number;

  @IsOptional()
  @IsString()
  imageUrl?: string; // URL da imagem, opcional
}
