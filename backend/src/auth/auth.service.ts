import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt'
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usuarioService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUsuarioDto: CreateUsuarioDto) {
    const newUser = await this.usuarioService.create(createUsuarioDto);
    const payload = { newUser };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    
  }
}
