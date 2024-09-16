import { Usuario } from "src/usuario/entities/usuario.entity";
import { Message } from "../entities/message.entity";
import { Post } from "src/post/entities/post.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
    @ApiProperty({ required: true, maxLength: 255 })
    content: string;

    @ApiProperty({ required: true })
    post: Post;

    @ApiProperty({ required: true })
    user: Usuario;

    @ApiProperty({ required: false })
    parentMessage: Message;
}
