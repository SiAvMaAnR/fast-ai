import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatNotFoundError } from './chat.errors';
import { ApiKey } from '../api-keys/entities/api-key.entity';
import { RecordNotFoundError } from '../common/common.errors';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  async create(user: User, createChatDto: CreateChatDto) {
    const { apiKeyId, name } = createChatDto;

    const apiKey = await this.apiKeyRepository.findOneBy({
      id: apiKeyId,
    });

    if (!apiKey) {
      throw new RecordNotFoundError('apiKey');
    }

    return this.chatRepository.save({
      name,
      apiKey: { id: apiKey.id },
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
