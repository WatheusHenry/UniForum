import { Response as ExpressResponse } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn-dto.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(@Body() signInDto: SignInDto, @Res() res: ExpressResponse) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    );
    res.setHeader('Authorization', `Bearer ${token}`).json(token);
    res.send();
  }
}
