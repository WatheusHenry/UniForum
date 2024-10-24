import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) { }

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const curso = this.cursoRepository.create(createCursoDto);
    return await this.cursoRepository.save(curso);
  }

  async findAll(): Promise<Curso[]> {
    return await this.cursoRepository.find({ relations: ['disciplinas', 'usuarios'] });
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ where: { id }, relations: ['disciplinas', 'usuarios'] });
    if (!curso) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.findOne(id);
    Object.assign(curso, updateCursoDto);
    return await this.cursoRepository.save(curso);
  }

  async remove(id: number): Promise<void> {
    const curso = await this.findOne(id);
    await this.cursoRepository.remove(curso);
  }
  
  async getAlunosByCursoId(cursoId: number): Promise<{ curso: Curso; alunos: Usuario[] }> {
    const curso = await this.cursoRepository.findOne({
      where: { id: cursoId },
      relations: ['users'], // Carregar a relação com usuários
    });
  
    if (!curso) {
      throw new NotFoundException(`Curso com ID ${cursoId} não encontrado`);
    }
  
    // Retorna um objeto contendo o curso e a lista de alunos
    return { curso, alunos: curso.users }; 
  }
}
