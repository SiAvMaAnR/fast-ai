import { ApiKey } from 'src/modules/api-keys/entities/api-key.entity';
import { Message } from 'src/modules/messages/entities/message.entity';
import { User } from 'src/modules/users/entities/user.entity';
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

  @ManyToOne(() => User, (user) => user.apiKeys)
  owner: User;

  @Column()
  ownerId: number;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToOne(() => ApiKey, (apiKey) => apiKey.chats)
  apiKey: ApiKey;

  @Column()
  apiKeyId: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
