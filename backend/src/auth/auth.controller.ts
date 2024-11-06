import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn-dto.dto';
import { Response as ExpressResponse } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { MinioService } from 'src/minio.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly minioService: MinioService,
  ) {}

  @Post('/login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: ExpressResponse) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return res.status(200).json({ token });
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async register(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @UploadedFile() profilePicture: Express.Multer.File,
    @Res() res: ExpressResponse,
  ) {
    try {
      if (!profilePicture) {
        return res.status(400).json({
          message: 'Arquivo de imagem não enviado.',
        });
      }

      await this.minioService.checkBucket('forum');

      const imageUrl = await this.minioService.uploadFile(profilePicture);

      const newUser = await this.authService.register(
        createUsuarioDto,
        imageUrl,
      );

      return res.status(201).json({
        user: newUser,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao registrar usuário',
        error: error.message,
      });
    }
  }
}
