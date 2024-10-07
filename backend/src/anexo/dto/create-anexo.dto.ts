import { ApiProperty } from "@nestjs/swagger";
import { Message } from "src/message/entities/message.entity";

export class CreateAnexoDto {
    @ApiProperty({ required: true })
    originalName: string;

    @ApiProperty({ required: true })
    storedName: string;

    @ApiProperty({ required: true })
    mimeType: string;

    @ApiProperty({ required: true })
    message: Message;
}
