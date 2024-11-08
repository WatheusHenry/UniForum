import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('message')
@ApiTags('Message')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @UploadedFile() image: Express.Multer.File, // Recebe o arquivo
  ) {
    return await this.messageService.create(createMessageDto, image);
  }

  @Get('/post/:postId')
  async findMessagesByPost(@Param('postId') postId: number) {
    return await this.messageService.findByPost(postId);
  }

  @Get()
  async findAll() {
    return await this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.messageService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.messageService.remove(+id);
  }
}
