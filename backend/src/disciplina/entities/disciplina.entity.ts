// disciplina.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';

@Entity('disciplinas')
export class Disciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Curso, (curso) => curso.disciplinas, { onDelete: 'CASCADE' })
  curso: Curso;  // Este campo refere-se ao curso ao qual a disciplina pertence
}
