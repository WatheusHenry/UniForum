import { IsOptional, IsString, IsDate, IsInt, IsUrl } from 'class-validator';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';

export class UpdatePostDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  user?: Usuario;

  @IsOptional()
  discipline?: Disciplina;

  @IsOptional()
  deletedAt?: Date | null;

  @IsOptional()
  deletedBy?: Usuario | null;
}
