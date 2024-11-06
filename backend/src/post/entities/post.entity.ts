import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { Message } from 'src/message/entities/message.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'content', type: 'longtext' })
  content: string;

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  imageUrl: string; // URL da imagem

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Usuario, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Usuario;

  @ManyToOne(() => Disciplina, (discipline) => discipline.posts)
  @JoinColumn({ name: 'discipline_id' })
  discipline: Disciplina;

  @OneToMany(() => Message, (message) => message.post)
  messages: Message[];
}
