import { Disciplina } from "src/disciplina/entities/disciplina.entity";
import { Message } from "src/message/entities/message.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'title', type: 'varchar', length: 255 })
    title: string;

    @Column({ name: 'content', type: 'varchar', length: 255 })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => Usuario, (user) => user.posts, { onDelete: 'CASCADE' })
    user: Usuario;

    @ManyToOne(() => Disciplina, (discipline) => discipline.posts)
    discipline: Disciplina;

    @OneToMany(() => Message, (message) => message.post)
    messages: Message[];
}
