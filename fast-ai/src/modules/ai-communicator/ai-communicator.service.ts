import { Injectable } from '@nestjs/common';
import { AIManager } from './core/ai-manager';
import { ChatGPTModel } from './core/chat-gpt/chat-gpt';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { GptModelEnum } from './core/chat-gpt/chat-gpt.constants';

@Injectable()
export class AiCoreService {
  public constructor() {}

  // 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
  async createCompletion(createCompletionDto: CreateCompletionDto) {
    const { message } = createCompletionDto;
    const apiKey = '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';
    const aiModel = new ChatGPTModel(apiKey, GptModelEnum.Gpt3T);

    const aiClient = new AIManager(aiModel);

    const result = await aiClient.createCompletion(message);

    return result;
  }
}
