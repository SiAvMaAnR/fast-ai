import { Message } from 'src/modules/ai-core/entities/message.entity';
import { User } from 'src/modules/users/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.apiKeys)
  owner: User;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
