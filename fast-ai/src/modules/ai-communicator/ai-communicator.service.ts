import { Injectable } from '@nestjs/common';
import { AIManager } from './core/ai-manager';
import { ChatGPTModel } from './core/chat-gpt/chat-gpt';
import { CreateCompletionDto } from './dto/create-completion.dto';
import {
  GptMessageRoleEnum,
  GptModelEnum,
} from './core/chat-gpt/chat-gpt.constants';
import { User } from '../users/entities/user.entity';
import { Message } from '../messages/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordNotFoundError } from '../common/common.errors';
import { AIModelEnum } from './ai-communicator.constants';
import { Chat } from '../chat/entities/chat.entity';

const AIModelInstanceMap = {
  [AIModelEnum.ChatGPT]: ChatGPTModel,
  // [AIModelEnum.ChatSonic]: ChatSonicModel,
};

@Injectable()
export class AiCoreService {
  public constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  // 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
  async createCompletion(user: User, createCompletionDto: CreateCompletionDto) {
    const { message, chatId } = createCompletionDto;

    const chat = await this.chatRepository.findOne({
      where: {
        id: chatId,
        ownerId: user.id,
      },
      relations: {
        apiKey: true,
        messages: true,
      },
    });

    if (!chat) {
      throw new RecordNotFoundError('chat');
    }

    const { apiKey, messages } = chat;

    const { model, content } = apiKey;

    const aiModel = new AIModelInstanceMap[model](content, GptModelEnum.Gpt3T);

    const aiClient = new AIManager(aiModel);

    const requestMessage = {
      role: GptMessageRoleEnum.User,
      content: message,
    };

    const adaptedMessages = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    const responseMessage = await aiClient.createCompletion([
      ...adaptedMessages,
      requestMessage,
    ]);

    await this.messageRepository.save([
      { ...requestMessage, chat: { id: chat.id } },
      { ...responseMessage, chat: { id: chat.id } },
    ]);

    return responseMessage;
  }
}
