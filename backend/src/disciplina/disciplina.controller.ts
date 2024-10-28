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
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Disciplina')
@Controller('disciplina')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Post()
  create(@Body() createDisciplinaDto: CreateDisciplinaDto) {
    return this.disciplinaService.create(createDisciplinaDto);
  }

  @Get()
  async findAll() {
    return await this.disciplinaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.disciplinaService.findOne(id);
  }

  @Get('curso/:cursoId')
  async findByCurso(@Param('cursoId') cursoId: number) {
    return await this.disciplinaService.findByCurso(cursoId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDisciplinaDto: UpdateDisciplinaDto,
  ) {
    return await this.disciplinaService.update(id, updateDisciplinaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.disciplinaService.remove(id);
  }
}
