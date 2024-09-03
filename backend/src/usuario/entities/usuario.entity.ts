import { Curso } from 'src/curso/entities/curso.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('users')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ManyToMany(() => Curso, (curso) => curso.usuarios, { cascade: true })
  @JoinTable({
    name: 'usuario_cursos', 
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  })
  cursos: Curso[];

  @Column({ type: 'varchar', length: 50 })
  currentTerm: string; // Pode ser algo como "2024.1", "2024.2", etc.
}
