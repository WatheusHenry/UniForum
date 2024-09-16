import { Message } from "src/message/entities/message.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('attachment')
export class Anexo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'original_name', length: 255 })
    originalName: string;

    @Column({ name: 'stored_name', length: 255 })
    storedName: string;

    @Column({ name: 'mime_type', length: 255 })
    mimeType: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => Message, (message) => message.attachments)
    message: Message;
}
