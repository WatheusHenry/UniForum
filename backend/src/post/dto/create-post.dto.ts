import { ApiProperty } from "@nestjs/swagger";
import { Disciplina } from "src/disciplina/entities/disciplina.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class CreatePostDto {
    @ApiProperty({ required: true, maxLength: 255 })
    title: string;

    @ApiProperty({ required: true, maxLength: 255 })
    content: string;

    @ApiProperty({ required: true })
    createdAt: Date;

    @ApiProperty({ required: true })
    user: Usuario;

    @ApiProperty({ required: true })
    discipline: Disciplina;
}
