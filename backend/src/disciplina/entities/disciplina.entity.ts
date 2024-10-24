// disciplina.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => Curso, (curso) => curso.disciplines, { eager: true })
  curso: Curso; // Mantenha a relação com o Curso

  @OneToMany(() => Post, (post) => post.discipline, { onDelete: 'CASCADE' })
  posts: Post[];
  course: any;
}
