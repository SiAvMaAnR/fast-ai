import { Injectable } from '@nestjs/common';
import openAI from 'openai';
import { OpenAiMessageRole, OpenAiModel } from './ai-core.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class AiCoreService {
  public constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const ai = new openAI({
      apiKey: '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',
    });

    const chatCompletion = await ai.chat.completions.create({
      messages: [
        {
          role: OpenAiMessageRole.User,
          content: 'Say this is a test',
        },
      ],
      model: OpenAiModel.Gpt3T,
    });

    console.log(chatCompletion);
    console.log(chatCompletion.choices[0].message);

    const [result] = chatCompletion.choices;

    return result.toString();
  }

  // async getMessagesByUser(user: User) {
  //   const chat = await this.chatRepository.findOneBy({ owner: user });
  //   return this.messageRepository.findOneBy({ chat });
  // }
}
