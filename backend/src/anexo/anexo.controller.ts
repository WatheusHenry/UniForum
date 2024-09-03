import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnexoService } from './anexo.service';
import { CreateAnexoDto } from './dto/create-anexo.dto';
import { UpdateAnexoDto } from './dto/update-anexo.dto';

@Controller('anexo')
export class AnexoController {
  constructor(private readonly anexoService: AnexoService) {}

  @Post()
  create(@Body() createAnexoDto: CreateAnexoDto) {
    return this.anexoService.create(createAnexoDto);
  }

  @Get()
  findAll() {
    return this.anexoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anexoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnexoDto: UpdateAnexoDto) {
    return this.anexoService.update(+id, updateAnexoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anexoService.remove(+id);
  }
}
