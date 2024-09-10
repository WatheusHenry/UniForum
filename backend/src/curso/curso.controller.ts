import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Post()
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
  async update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto) {
    return await this.cursoService.update(id, updateCursoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.cursoService.remove(id);
  }
}
