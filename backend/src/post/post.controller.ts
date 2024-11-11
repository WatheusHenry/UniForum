import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Intercepta o arquivo enviado
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File, // Recebe o arquivo
  ) {
    console.log(createPostDto);
    return await this.postService.create(createPostDto, image);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.postService.findAll(page, limit);
  }

  @Get('user/:userId')
  async findByUserId(
    @Param('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.postService.findByUserId(userId, page, limit);
  }

  @Get('curso/:cursoId')
  async findByCursoId(
    @Param('cursoId') cursoId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.postService.findByCursoId(cursoId, page, limit);
  }

  @Get('materia/:materiaId')
  async findByMateriaId(
    @Param('materiaId') materiaId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.postService.findByMateriaId(materiaId, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.postService.remove(id);
  }
}
