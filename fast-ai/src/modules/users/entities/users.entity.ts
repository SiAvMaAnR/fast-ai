import { IsEmail, Length } from 'class-validator';
import { ApiKey } from 'src/modules/api-keys/entities/api-key.entity';
import { Chat } from 'src/modules/chat/entities/chat.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(4, 20)
  login!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ApiKey, (key) => key.owner)
  apiKeys: ApiKey[];

  @OneToMany(() => Chat, (chat) => chat.owner)
  chats: Chat[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
