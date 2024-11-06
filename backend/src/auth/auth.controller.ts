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
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: ExpressResponse) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return res.status(200).json({ token });
  }

  // Endpoint para registrar o usuário com upload de foto de perfil
  @Post('/register')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2MB
    }),
  )
  async register(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @UploadedFile() profilePicture: Express.Multer.File,
    @Res() res: ExpressResponse,
  ) {
    try {
      const newUser = await this.authService.register(
        createUsuarioDto,
        profilePicture,
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
