import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatNotFoundError } from './chat.errors';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async create(user: User, createChatDto: CreateChatDto) {
    return this.chatRepository.save({
      ...createChatDto,
      owner: { id: user.id },
    });
  }

  async findAll(user: User) {
    return this.chatRepository.findBy({
      owner: { id: user.id },
    });
  }

  async findOne(user: User, id: number) {
    return this.chatRepository.findOneBy({
      id,
      owner: { id: user.id },
    });
  }

  async update(user: User, id: number, updateChatDto: UpdateChatDto) {
    const chat = await this.chatRepository.findOneBy({
      id,
      owner: { id: user.id },
    });

    if (!chat) {
      throw new ChatNotFoundError();
    }

    return this.chatRepository.update(id, updateChatDto);
  }

  async remove(user: User, id: number) {
    const chat = await this.chatRepository.findOneBy({
      id,
      owner: { id: user.id },
    });

    if (!chat) {
      throw new ChatNotFoundError();
    }

    return this.chatRepository.delete(id);
  }
}
