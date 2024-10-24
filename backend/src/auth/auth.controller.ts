import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn-dto.dto';
import { Response as ExpressResponse } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: ExpressResponse) {
    const token = await this.authService.signIn(signInDto.email, signInDto.password);

    // Retorna o token no corpo da resposta, ao invés de setar no cabeçalho
    return res.status(200).json({ token });
  }

  // Endpoint para registrar o usuário
  @Post('/register')
  async register(@Body() createUsuarioDto: CreateUsuarioDto, @Res() res: ExpressResponse) {
    try {
      const newUser = await this.authService.register(createUsuarioDto);
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
