import { Request as ExpressRequest } from 'express';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export interface Request extends ExpressRequest {
  user?: Usuario;
}
