import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


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
}
