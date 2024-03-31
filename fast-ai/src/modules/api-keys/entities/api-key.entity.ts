import { AIModelEnum } from 'src/modules/ai-communicator/core/ai-manager.types';
import { Chat } from 'src/modules/chat/entities/chat.entity';
import { ColumnTypeEnum } from 'src/modules/common/common.enums';
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
export class ApiKey {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  optionalContent?: string;

  @ManyToOne(() => User, (user) => user.apiKeys)
  owner: User;

  @Column()
  ownerId: number;

  @OneToMany(() => Chat, (chat) => chat.apiKey)
  chats: Chat[];

  @Column({
    type: ColumnTypeEnum.Enum,
    enum: AIModelEnum,
  })
  model: AIModelEnum;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
