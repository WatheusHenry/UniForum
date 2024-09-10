// curso.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';

@Entity('courses')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.cursos)
  usuarios: Usuario[];

  @OneToMany(() => Disciplina, (disciplina) => disciplina.curso)
  disciplinas: Disciplina[];
}
