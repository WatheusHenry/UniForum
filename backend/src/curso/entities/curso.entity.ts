// curso.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => Usuario, (user) => user.curso) // Relacionamento inverso com Usuário
  users: Usuario[];

  @OneToMany(() => Disciplina, (discipline) => discipline.course)
  disciplines: Disciplina[];
}
