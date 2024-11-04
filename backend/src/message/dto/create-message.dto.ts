// create-message.dto.ts
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  parentMessageId?: number;
}
