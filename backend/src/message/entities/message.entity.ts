import { Anexo } from "src/anexo/entities/anexo.entity";
import { Post } from "src/post/entities/post.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => Post, (post) => post.messages, { onDelete: 'CASCADE' })
    post: Post;

    @ManyToOne(() => Usuario, (user) => user.messages, { onDelete: 'CASCADE' })
    user: Usuario;

    @ManyToOne(() => Message, (message) => message.replies, { onDelete: 'CASCADE' })
    parentMessage: Message;

    @OneToMany(() => Message, (message) => message.parentMessage)
    replies: Message[];

    @OneToMany(() => Anexo, (anexo) => anexo.message)
    attachments: Anexo[];
}
