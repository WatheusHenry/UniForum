// disciplina.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity('discipline')
export class Disciplina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Curso, (course) => course.disciplines, { onDelete: 'CASCADE' })
  course: Curso;  // Este campo refere-se ao curso ao qual a disciplina pertence

  @OneToMany(() => Post, (post) => post.discipline, { onDelete: 'CASCADE' })
  posts: Post[];
}
