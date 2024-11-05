import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from './entities/curso.entity';

@ApiTags('Course')
@Controller('curso')
@ApiBearerAuth()
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  @UseGuards(AuthGuard) // Aplica o AuthGuard apenas nesta rota
  async create(@Body() createCursoDto: CreateCursoDto) {
    return await this.cursoService.create(createCursoDto);
  }

  @Get()
  async findAll() {
    return await this.cursoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.cursoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard) // Aplica o AuthGuard apenas nesta rota
  async update(
    @Param('id') id: number,
    @Body() updateCursoDto: UpdateCursoDto,
  ) {
    return await this.cursoService.update(id, updateCursoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard) // Aplica o AuthGuard apenas nesta rota
  async remove(@Param('id') id: number) {
    return await this.cursoService.remove(id);
  }

  @Get(':id/alunos')
  @UseGuards(AuthGuard) // Aplica o AuthGuard apenas nesta rota
  async getAlunos(
    @Param('id') id: number,
  ): Promise<{ curso: Curso; alunos: Usuario[] }> {
    return this.cursoService.getAlunosByCursoId(id);
  }
}
