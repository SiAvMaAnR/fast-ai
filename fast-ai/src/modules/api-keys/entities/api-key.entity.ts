import { ColumnTypeEnum } from 'src/common/enums/column-type';
import { AIModelEnum } from 'src/modules/ai-communicator/ai-communicator.constants';
import { Chat } from 'src/modules/chat/entities/chat.entity';
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
  content!: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.apiKeys)
  owner: User;

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
