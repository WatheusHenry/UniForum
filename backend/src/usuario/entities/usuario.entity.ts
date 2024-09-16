import { ApiProperty } from '@nestjs/swagger';
import { Curso } from 'src/curso/entities/curso.entity';
import { Message } from 'src/message/entities/message.entity';
import { Post } from 'src/post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';

@Entity('users')
export class Usuario {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email do usuário' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário', writeOnly: true })
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty({ type: () => [Curso], description: 'Cursos em que o usuário está matriculado', isArray: true })
  @ManyToMany(() => Curso, (course) => course.users, { cascade: true })
  // @JoinTable({
  //   name: 'usuario_cursos',
  //   joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  // })
  courses: Curso[];

  @ApiProperty({ example: '2024.1', description: 'Período atual do usuário' })
  @Column({ name: 'current_term', type: 'varchar', length: 50 })
  currentTerm: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
