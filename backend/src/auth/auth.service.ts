import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt'
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  userService: any;
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) {}

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
    // Supondo que o método `create` no `UserService` seja responsável por salvar o usuário no banco de dados
    const newUser = await this.userService.create(createUsuarioDto);
    return newUser;
  }
}
