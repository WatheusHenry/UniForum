import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Disciplina } from './entities/disciplina.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class DisciplinaService {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,

    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  async create(createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    const curso = await this.cursoRepository.findOne({
      where: { id: createDisciplinaDto.courseId },
    });
    if (!curso) {
      throw new NotFoundException(
        `Curso com ID ${createDisciplinaDto.courseId} não encontrado`,
      );
    }

    const disciplina = this.disciplinaRepository.create({
      ...createDisciplinaDto,
      curso,
    });

    return await this.disciplinaRepository.save(disciplina);
  }

  async findByCurso(cursoId: number): Promise<Disciplina[]> {
    const curso = await this.cursoRepository.findOne({
      where: { id: cursoId },
    });
    if (!curso) {
      throw new NotFoundException(`Curso com ID ${cursoId} não encontrado`);
    }

    return await this.disciplinaRepository.find({
      where: { curso: { id: cursoId } },
      relations: ['curso'],
    });
  }

  async findAll(): Promise<Disciplina[]> {
    return await this.disciplinaRepository.find({ relations: ['curso'] });
  }

  async findOne(id: number): Promise<Disciplina> {
    const disciplina = await this.disciplinaRepository.findOne({
      where: { id },
      relations: ['curso'],
    });
    if (!disciplina) {
      throw new NotFoundException(`Disciplina com ID ${id} não encontrada`);
    }
    return disciplina;
  }

  async update(
    id: number,
    updateDisciplinaDto: UpdateDisciplinaDto,
  ): Promise<Disciplina> {
    const disciplina = await this.findOne(id);
    Object.assign(disciplina, updateDisciplinaDto);
    return await this.disciplinaRepository.save(disciplina);
  }

  async remove(id: number): Promise<void> {
    const disciplina = await this.findOne(id);
    await this.disciplinaRepository.remove(disciplina);
  }
}
