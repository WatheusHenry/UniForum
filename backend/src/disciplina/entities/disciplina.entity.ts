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

  @ManyToOne(() => Curso, (course) => course.disciplines, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Curso;

  @OneToMany(() => Post, (post) => post.discipline, { onDelete: 'CASCADE' })
  posts: Post[];
}
