import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from 'src/minio.service';

@ApiTags('User')
@Controller('user')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly minioService: MinioService,
  ) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOneById(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Patch('resetPassword/:id')
  updatePassword(
    @Param('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { password } = updatePasswordDto;
    if (!password) {
      throw new BadRequestException('A nova senha é obrigatória');
    }
    return this.usuarioService.updatePassword(id, password);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  // Rota para atualizar a foto de perfil
  @Post('updateProfilePicture/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateProfilePicture(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('A foto de perfil é obrigatória');
    }

    // Verifica o tipo de arquivo, se necessário (ex: imagem)
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException('Formato de arquivo inválido');
    }

    // Faz o upload da foto no MinIO
    const fileUrl = await this.minioService.uploadFile(file);

    // Atualiza o usuário com a nova foto de perfil
    const updatedUser = await this.usuarioService.updateProfilePicture(
      id,
      fileUrl,
    );

    return {
      message: 'Foto de perfil atualizada com sucesso',
      user: updatedUser,
    };
  }
}
