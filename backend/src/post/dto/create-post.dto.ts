import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreatePostDto {
  @ApiProperty({ required: true, maxLength: 255 })
  title: string;

  @ApiProperty({ required: true, maxLength: 255 })
  content: string;

  @ApiProperty({ required: true })
  createdAt: Date;

  @IsNotEmpty()
  userId: number; // ou o tipo que representa seu usuário

  @IsNotEmpty()
  disciplineId: number;
}
