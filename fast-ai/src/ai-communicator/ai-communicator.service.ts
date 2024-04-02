import { Injectable } from '@nestjs/common';
import { AIManager, IAIModel } from './core/ai-manager';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { User } from '../users/entities/user.entity';
import { Message } from '../messages/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordNotFoundError } from '../common/common.errors';
import { Chat } from '../chat/entities/chat.entity';
import {
  AIModelInstanceMap,
  modelMapper,
} from './core/ai-manager.model-mapper';

@Injectable()
export class AiCommunicatorService {
  public constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async createCompletion(user: User, createCompletionDto: CreateCompletionDto) {
    const { message, chatId, temperature } = createCompletionDto;

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

    const integration = modelMapper[apiKey.model];

    const aiModel: IAIModel = new AIModelInstanceMap[integration](apiKey);

    const aiClient = new AIManager(aiModel);

    const requestMessage = {
      role: aiModel.userRole,
      content: message,
    };

    const adaptedMessages = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    const responseMessage = await aiClient.createCompletion({
      messages: [...adaptedMessages, requestMessage],
      temperature,
    });

    await this.messageRepository.save([
      { ...requestMessage, chat: { id: chat.id } },
      { ...responseMessage, chat: { id: chat.id } },
    ]);

    return responseMessage;
  }
}
