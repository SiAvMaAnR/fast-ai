import openAI from 'openai';
import { IAIModel } from '../ai-manager';
import { ChatGPTMessageRoleEnum } from './chat-gpt.types';
import {
  AIModelEnum,
  CreateCompletionArgsT,
  MessageT,
} from '../ai-manager.types';
import { defaultTemperature } from '../ai-manager.constants';
import { RequestFailedError } from '../ai-manager.errors';
import { ApiKey } from 'src/api-keys/entities/api-key.entity';

class ChatGPTModel implements IAIModel {
  private client: openAI;
  private model: AIModelEnum;
  public userRole = ChatGPTMessageRoleEnum.User;

  public constructor(apiKey: ApiKey) {
    this.client = new openAI({ apiKey: apiKey.content });
    this.model = apiKey.model;
  }

  public async createCompletion(
    args: CreateCompletionArgsT,
  ): Promise<MessageT> {
    const { messages, temperature } = args;

    const adaptedMessages = messages.map((message) => ({
      ...message,
      role: message.role as ChatGPTMessageRoleEnum,
    }));

    const chatCompletion = await this.client.chat.completions
      .create({
        messages: adaptedMessages,
        model: this.model,
        temperature: temperature || defaultTemperature,
      })
      .catch((error) => {
        throw new RequestFailedError(this.model, error.message);
      });

    const [choice] = chatCompletion.choices;

    return choice.message;
  }
}

export { ChatGPTModel };
